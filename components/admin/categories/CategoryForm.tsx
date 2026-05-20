"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { type Locale } from "@/i18n";
import { type Category } from "@/data/categories";

type CategoryFormProps = {
  locale: Locale;
  mode: "create" | "edit";
  category?: Category;
  action?: (formData: FormData) => void;
};

export function CategoryForm({
  locale,
  mode,
  category,
  action,
}: CategoryFormProps) {
  const isEdit = mode === "edit";

  const t = useTranslations("admin.categories.form");
  const common = useTranslations("admin.common");

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mb-6">
        <Link
          href={`/${locale}/admin/categories`}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-gold transition hover:text-brand-goldDark"
        >
          <ArrowLeft className="h-4 w-4" />
          {common("back")}
        </Link>
      </div>

      <form action={action} className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div className="admin-card p-6 lg:p-8">
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("categoryName")} TR
                </label>

                <input
                  type="text"
                  name="name_tr"
                  defaultValue={category?.name.tr ?? ""}
                  placeholder="Başlangıçlar"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("categoryName")} EN
                </label>

                <input
                  type="text"
                  name="name_en"
                  defaultValue={category?.name.en ?? ""}
                  placeholder="Starters"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("categoryName")} RU
                </label>

                <input
                  type="text"
                  name="name_ru"
                  defaultValue={category?.name.ru ?? ""}
                  placeholder="Закуски"
                  className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                {t("slug")}
              </label>

              <input
                type="text"
                name="slug"
                defaultValue={category?.slug ?? ""}
                placeholder="starters"
                className="mt-3 h-13 w-full border border-neutral-200 bg-[#FAF8F3] px-4 text-sm outline-none transition focus:border-brand-gold"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("description")} TR
                </label>

                <textarea
                  rows={5}
                  name="description_tr"
                  defaultValue={category?.description?.tr ?? ""}
                  placeholder="Lezzetli başlangıç tabakları."
                  className="mt-3 w-full border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("description")} EN
                </label>

                <textarea
                  rows={5}
                  name="description_en"
                  defaultValue={category?.description?.en ?? ""}
                  placeholder="Delicious starter plates."
                  className="mt-3 w-full border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {t("description")} RU
                </label>

                <textarea
                  rows={5}
                  name="description_ru"
                  defaultValue={category?.description?.ru ?? ""}
                  placeholder="Вкусные закуски."
                  className="mt-3 w-full border border-neutral-200 bg-[#FAF8F3] px-4 py-4 text-sm outline-none transition focus:border-brand-gold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="admin-card p-6">
            <h2 className="text-lg font-semibold text-dark-bg">
              {t("visibility")}
            </h2>

            <div className="mt-5 space-y-4">
              <label className="flex items-center justify-between border border-neutral-200 bg-[#FAF8F3] px-4 py-4">
                <span className="text-sm font-medium text-dark-bg">
                  {t("featuredCategory")}
                </span>

                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={category?.isFeatured ?? false}
                  className="h-4 w-4 accent-brand-gold"
                />
              </label>

              <label className="flex items-center justify-between border border-neutral-200 bg-[#FAF8F3] px-4 py-4">
                <span className="text-sm font-medium text-dark-bg">
                  {t("categoryActive")}
                </span>

                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={category?.isActive ?? true}
                  className="h-4 w-4 accent-brand-gold"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 flex h-14 w-full items-center justify-center bg-brand-gold text-sm font-bold uppercase tracking-[0.14em] text-white shadow-gold transition hover:bg-brand-goldLight"
            >
              {isEdit ? t("updateCategory") : t("createCategory")}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
