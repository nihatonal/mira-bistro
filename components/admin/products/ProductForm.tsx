"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ImagePlus } from "lucide-react";

import { type Locale } from "@/i18n";
import { type Category } from "@/data/categories";
import { uploadProductImage } from "@/lib/supabase/upload-product-image";

type ProductFormProps = {
  locale: Locale;
  mode: "create" | "edit";
  product?: {
    id: string;
    slug: string;
    category: string;

    name: Record<Locale, string>;
    description: Record<Locale, string>;

    priceTry: number;
    priceUsd: number;

    image: string;

    preparationMinutes: number;
    portionCount: number;

    isFeatured?: boolean;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
  };
  categories: Category[];
  action?: (formData: FormData) => void;
};

export function ProductForm({
  locale,
  mode,
  product,
  categories,
  action,
}: ProductFormProps) {
  const isEdit = mode === "edit";

  const t = useTranslations("admin.products.form");
  const common = useTranslations("admin.common");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState(
    product?.image ?? "/images/menu/fettuccine.png",
  );
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      setIsUploading(true);

      const form = event.currentTarget.form;
      const slug =
        product?.slug ||
        form?.querySelector<HTMLInputElement>('input[name="slug"]')?.value ||
        form
          ?.querySelector<HTMLInputElement>('input[name="name_tr"]')
          ?.value.toLowerCase()
          .trim()
          .replace(/\s+/g, "-") ||
        "product";

      const uploadedUrl = await uploadProductImage({
        file,
        slug,
      });

      setImageUrl(uploadedUrl);
      setPreviewUrl(uploadedUrl);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mb-6">
        <Link
          href={`/${locale}/admin/products`}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-gold transition hover:text-brand-goldDark"
        >
          <ArrowLeft className="h-4 w-4" />
          {common("back")}
        </Link>
      </div>

      <form className="grid gap-8 xl:grid-cols-[1fr_380px]" action={action}>
        <input type="hidden" name="image_url" value={imageUrl} />

        <div className="admin-card p-6 lg:p-8">
          <div className="grid gap-6">
            {/* production name */}
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("productName")} TR
                </label>

                <input
                  name="name_tr"
                  type="text"
                  defaultValue={product?.name.tr ?? ""}
                  placeholder="Fettuccine Alfredo"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("productName")} EN
                </label>

                <input
                  name="name_en"
                  type="text"
                  defaultValue={product?.name.en ?? ""}
                  placeholder="Fettuccine Alfredo"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("productName")} RU
                </label>

                <input
                  name="name_ru"
                  type="text"
                  defaultValue={product?.name.ru ?? ""}
                  placeholder="Феттучини Альфредо"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>
            </div>

            {/* production description */}
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("description")} TR
                </label>

                <textarea
                  name="description_tr"
                  rows={5}
                  defaultValue={product?.description.tr ?? ""}
                  placeholder="Ürün açıklaması..."
                  className="mt-3 w-full border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("description")} EN
                </label>

                <textarea
                  name="description_en"
                  rows={5}
                  defaultValue={product?.description.en ?? ""}
                  placeholder="Product description..."
                  className="mt-3 w-full border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("description")} RU
                </label>

                <textarea
                  name="description_ru"
                  rows={5}
                  defaultValue={product?.description.ru ?? ""}
                  placeholder="Описание продукта..."
                  className="mt-3 w-full border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Price (₺ TRY)
                </label>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-500">
                    ₺
                  </span>

                  <input
                    name="price_try"
                    type="number"
                    step="0.01"
                    defaultValue={product?.priceTry ?? ""}
                    placeholder="220"
                    className="h-13 w-full border border-neutral-200 bg-[#FAF8F3] pl-10 pr-4 text-sm outline-none transition focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Price ($ USD)
                </label>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-500">
                    $
                  </span>

                  <input
                    name="price_usd"
                    type="number"
                    step="0.01"
                    defaultValue={product?.priceUsd ?? ""}
                    placeholder="8"
                    className="h-13 w-full border border-neutral-200 bg-[#FAF8F3] pl-10 pr-4 text-sm outline-none transition focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("category")}
                </label>

                <select
                  name="category_slug"
                  defaultValue={product?.category ?? categories[0]?.slug}
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name[locale]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("preparationTime")}
                </label>

                <input
                  name="preparation_minutes"
                  type="number"
                  defaultValue={product?.preparationMinutes ?? 0}
                  placeholder="18"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />

                <p className="mt-2 text-xs text-neutral-500">Minutes only</p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("portion")}
                </label>

                <input
                  name="portion_count"
                  type="number"
                  defaultValue={product?.portionCount ?? 1}
                  placeholder="1"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />

                <p className="mt-2 text-xs text-neutral-500">
                  Numeric value only
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="flex items-center gap-3 border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm font-medium text-dark-bg">
                <input
                  name="is_vegetarian"
                  type="checkbox"
                  defaultChecked={product?.isVegetarian ?? false}
                  className="h-4 w-4 accent-brand-gold"
                />
                {t("vegetarian")}
              </label>

              <label className="flex items-center gap-3 border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm font-medium text-dark-bg">
                <input
                  name="is_vegan"
                  type="checkbox"
                  defaultChecked={product?.isVegan ?? false}
                  className="h-4 w-4 accent-brand-gold"
                />
                {t("vegan")}
              </label>

              <label className="flex items-center gap-3 border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm font-medium text-dark-bg">
                <input
                  name="is_gluten_free"
                  type="checkbox"
                  defaultChecked={product?.isGlutenFree ?? false}
                  className="h-4 w-4 accent-brand-gold"
                />
                {t("glutenFree")}
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="admin-card p-6">
            <h2 className="text-lg font-semibold text-dark-bg">
              {t("productImage")}
            </h2>

            <div className="mt-6 border border-dashed border-neutral-300 bg-[#FAF8F3] p-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                  <ImagePlus className="h-8 w-8" />
                </div>

                <p className="mt-4 text-sm font-medium text-dark-bg">
                  {t("uploadImage")}
                </p>

                <p className="mt-2 text-xs leading-6 text-neutral-500">
                  PNG, JPG, WEBP up to 5MB
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="mt-5 inline-flex h-11 items-center justify-center border border-brand-gold px-5 text-sm font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploading ? "Uploading..." : t("chooseFile")}
                </button>
              </div>
            </div>

            <div className="relative mt-6 aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          <div className="admin-card p-6">
            <h2 className="text-lg font-semibold text-dark-bg">
              {t("visibility")}
            </h2>

            <div className="mt-5 space-y-4">
              <label className="flex items-center justify-between border border-neutral-200 bg-[#FAF8F3] px-4 py-4">
                <span className="text-sm font-medium text-dark-bg">
                  {t("featuredProduct")}
                </span>

                <input
                  name="is_featured"
                  type="checkbox"
                  defaultChecked={product?.isFeatured ?? false}
                  className="h-4 w-4 accent-brand-gold"
                />
              </label>

              <label className="flex items-center justify-between border border-neutral-200 bg-[#FAF8F3] px-4 py-4">
                <span className="text-sm font-medium text-dark-bg">
                  {t("productActive")}
                </span>

                <input
                  name="is_active"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-brand-gold"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="mt-6 flex h-14 w-full items-center justify-center bg-brand-gold text-sm font-bold uppercase tracking-[0.14em] text-white shadow-gold transition hover:bg-brand-goldLight disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isEdit ? t("updateProduct") : t("createProduct")}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
