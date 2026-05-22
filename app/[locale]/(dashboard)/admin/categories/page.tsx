import Link from "next/link";
import { Edit, Folder, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { DeleteCategoryButton } from "@/components/admin/categories/DeleteCategoryButton";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteCategoryAction } from "./actions";
import { AdminSearch } from "@/components/admin/AdminSearch";

import { type Locale } from "@/i18n";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

type AdminCategoriesPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function AdminCategoriesPage({
  params,
  searchParams,
}: AdminCategoriesPageProps) {
  const { locale } = await params;

  const { q } = await searchParams;
  const searchQuery = q?.trim() ?? "";

  const currentLocale = locale as Locale;

  const t = await getTranslations({
    locale,
    namespace: "admin.categories",
  });

  const supabase = await createSupabaseServerClient();

  let categoriesQuery = supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (searchQuery) {
    categoriesQuery = categoriesQuery.or(
      `slug.ilike.%${searchQuery}%,name_tr.ilike.%${searchQuery}%,name_en.ilike.%${searchQuery}%,name_ru.ilike.%${searchQuery}%`,
    );
  }

  const { data: categories, error } = await categoriesQuery;

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
        <div className="admin-card p-4 md:p-6">
          <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <AdminSearch
              placeholder={t("searchPlaceholder")}
              defaultValue={searchQuery}
              className="lg:w-[320px]"
            />

            <Link
              href={`/${currentLocale}/admin/categories/new`}
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-brand-gold px-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-gold transition hover:bg-brand-goldLight lg:w-auto"
            >
              <Plus className="h-4 w-4" />

              {t("addCategory")}
            </Link>
          </div>

          {categories?.length === 0 ? (
            <div className="mt-6">
              <AdminEmptyState
                title={t("empty.title")}
                description={t("empty.description")}
                actionLabel={t("addCategory")}
                actionHref={`/${currentLocale}/admin/categories/new`}
              />
            </div>
          ) : (
            <>
              <div className="hidden mt-6 overflow-x-auto lg:block">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-[0.16em] text-neutral-500">
                      <th className="pb-4">{t("table.category")}</th>

                      <th className="pb-4">{t("table.slug")}</th>

                      <th className="pb-4">{t("table.status")}</th>

                      <th className="pb-4 text-right">{t("table.actions")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories?.map((category) => {
                      const categoryName =
                        currentLocale === "tr"
                          ? category.name_tr
                          : currentLocale === "en"
                            ? category.name_en
                            : category.name_ru;

                      const categoryDescription =
                        currentLocale === "tr"
                          ? category.description_tr
                          : currentLocale === "en"
                            ? category.description_en
                            : category.description_ru;

                      return (
                        <tr
                          key={category.id}
                          className="border-b border-neutral-100 last:border-0"
                        >
                          <td className="py-5">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center bg-brand-gold/10 text-brand-gold">
                                <Folder className="h-6 w-6" />
                              </div>

                              <div>
                                <h3 className="font-semibold text-dark-bg">
                                  {categoryName}
                                </h3>

                                <p className="mt-1 line-clamp-1 max-w-sm text-sm text-neutral-500">
                                  {categoryDescription}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-5">
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600">
                              {category.slug}
                            </span>
                          </td>

                          <td className="py-5">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                category.is_active
                                  ? "bg-status-active/10 text-status-active"
                                  : "bg-status-inactive/10 text-status-inactive"
                              }`}
                            >
                              {category.is_active
                                ? t("status.active")
                                : t("status.inactive")}
                            </span>
                          </td>

                          <td className="py-5">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/${currentLocale}/admin/categories/${category.slug}/edit`}
                                className="flex h-10 w-10 items-center justify-center border border-neutral-200 transition hover:border-brand-gold hover:text-brand-gold"
                              >
                                <Edit className="h-4 w-4" />
                              </Link>

                              <DeleteCategoryButton
                                action={deleteCategoryAction.bind(
                                  null,
                                  currentLocale,
                                  category.id,
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
              <div className="mt-6 grid gap-4 lg:hidden">
                {categories?.map((category) => {
                  const categoryName =
                    currentLocale === "tr"
                      ? category.name_tr
                      : currentLocale === "en"
                        ? category.name_en
                        : category.name_ru;

                  const categoryDescription =
                    currentLocale === "tr"
                      ? category.description_tr
                      : currentLocale === "en"
                        ? category.description_en
                        : category.description_ru;

                  return (
                    <div
                      key={category.id}
                      className="border border-neutral-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand-gold/10 text-brand-gold">
                          <Folder className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-display text-2xl font-semibold text-dark-bg">
                                {categoryName}
                              </h3>

                              <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                                {categoryDescription}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                category.is_active
                                  ? "bg-status-active/10 text-status-active"
                                  : "bg-status-inactive/10 text-status-inactive"
                              }`}
                            >
                              {category.is_active
                                ? t("status.active")
                                : t("status.inactive")}
                            </span>
                          </div>

                          <div className="mt-5 border border-neutral-200 bg-[#FAF8F3] p-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                              {t("table.slug")}
                            </p>

                            <p className="mt-1 text-sm font-semibold text-dark-bg">
                              {category.slug}
                            </p>
                          </div>

                          <div className="mt-5 flex gap-2">
                            <Link
                              href={`/${currentLocale}/admin/categories/${category.slug}/edit`}
                              className="flex h-11 flex-1 items-center justify-center gap-2 border border-neutral-200 bg-white text-sm font-semibold text-dark-bg transition hover:border-brand-gold hover:text-brand-gold"
                            >
                              <Edit className="h-4 w-4" />
                              {t("table.actions")}
                            </Link>

                            <DeleteCategoryButton
                              action={deleteCategoryAction.bind(
                                null,
                                currentLocale,
                                category.id,
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
