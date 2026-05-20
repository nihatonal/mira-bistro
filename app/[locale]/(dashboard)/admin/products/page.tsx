import Image from "next/image";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { DeleteProductButton } from "@/components/admin/products/DeleteProductButton";
import { deleteProductAction } from "./actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminSearch } from "@/components/admin/AdminSearch";

import { formatCurrency } from "@/lib/utils";
import { type Locale } from "@/i18n";

type AdminProductsPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function AdminProductsPage({
  params,
  searchParams,
}: AdminProductsPageProps) {
  const { locale } = await params;
  const { q } = await searchParams;
  const searchQuery = q?.trim() ?? "";
  const currentLocale = locale as Locale;

  const t = await getTranslations({
    locale,
    namespace: "admin.products",
  });

  const supabase = await createSupabaseServerClient();

  let productsQuery = supabase
    .from("products")
    .select(
      `
    id,
    slug,
    name_tr,
    name_en,
    name_ru,
    description_tr,
    description_en,
    description_ru,
    image_url,
    price_try,
    price_usd,
    is_active,
    categories (
      slug,
      name_tr,
      name_en,
      name_ru
    )
  `,
    )
    .order("created_at", { ascending: false });

  if (searchQuery) {
    productsQuery = productsQuery.or(
      `slug.ilike.%${searchQuery}%,name_tr.ilike.%${searchQuery}%,name_en.ilike.%${searchQuery}%,name_ru.ilike.%${searchQuery}%,description_tr.ilike.%${searchQuery}%,description_en.ilike.%${searchQuery}%,description_ru.ilike.%${searchQuery}%`,
    );
  }

  const { data: products, error } = await productsQuery;
  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <AdminHeader
        title={t("title")}
        description={t("description")}
        locale={locale as Locale}
      />

      <main className="flex-1 p-6 lg:p-10">
        <div className="admin-card p-6">
          <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <AdminSearch
              placeholder={t("searchPlaceholder")}
              defaultValue={searchQuery}
              className="lg:w-[360px]"
            />

            <Link
              href={`/${currentLocale}/admin/products/new`}
              className="inline-flex h-12 items-center justify-center gap-2 bg-brand-gold px-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-gold transition hover:bg-brand-goldLight"
            >
              <Plus className="h-4 w-4" />
              {t("addProduct")}
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-[0.16em] text-neutral-500">
                  <th className="pb-4">{t("table.product")}</th>
                  <th className="pb-4">{t("table.category")}</th>
                  <th className="pb-4">{t("table.price")}</th>
                  <th className="pb-4">{t("table.status")}</th>
                  <th className="pb-4 text-right">{t("table.actions")}</th>
                </tr>
              </thead>

              <tbody>
                {products?.map((item) => {
                  const category = item.categories as {
                    name_tr?: string;
                    name_en?: string;
                    name_ru?: string;
                  } | null;
                  const name =
                    currentLocale === "tr"
                      ? item.name_tr
                      : currentLocale === "en"
                        ? item.name_en
                        : item.name_ru;

                  const description =
                    currentLocale === "tr"
                      ? item.description_tr
                      : currentLocale === "en"
                        ? item.description_en
                        : item.description_ru;

                  const categoryName =
                    currentLocale === "tr"
                      ? category?.name_tr
                      : currentLocale === "en"
                        ? category?.name_en
                        : category?.name_ru;

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-100 last:border-0"
                    >
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-20 overflow-hidden bg-neutral-100">
                            <Image
                              src={
                                item.image_url || "/images/menu/fettuccine.png"
                              }
                              alt={name}
                              fill
                              unoptimized={Boolean(item.image_url)}
                              className="object-cover"
                              sizes="80px"
                              loading="eager"
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold text-dark-bg">
                              {name}
                            </h3>
                            <p className="mt-1 line-clamp-1 max-w-sm text-sm text-neutral-500">
                              {description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 text-sm text-neutral-600">
                        {categoryName}
                      </td>

                      <td className="py-5 font-semibold text-dark-bg">
                        {currentLocale === "tr"
                          ? formatCurrency(Number(item.price_try), "TRY")
                          : formatCurrency(Number(item.price_usd), "USD")}
                      </td>

                      <td className="py-5">
                        <span className="rounded-full bg-status-active/10 px-3 py-1 text-xs font-semibold text-status-active">
                          {item.is_active ? t("status.active") : "Inactive"}
                        </span>
                      </td>

                      <td className="py-5">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/${currentLocale}/admin/products/${item.id}/edit`}
                            className="flex h-10 w-10 items-center justify-center border border-neutral-200 transition hover:border-brand-gold hover:text-brand-gold"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>

                          <DeleteProductButton
                            action={deleteProductAction.bind(
                              null,
                              currentLocale,
                              item.id,
                            )}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
