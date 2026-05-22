import Link from "next/link";
import { Edit, Eye, Plus, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { DeleteTableButton } from "@/components/admin/tables/DeleteTableButton";

import { TableQrCode } from "@/components/admin/tables/TableQrCode";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteTableAction } from "./actions";

import { type Locale } from "@/i18n";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

type AdminTablesPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function AdminTablesPage({
  params,
  searchParams,
}: AdminTablesPageProps) {
  const { locale } = await params;
  const { q } = await searchParams;

  const currentLocale = locale as Locale;
  const searchQuery = q?.trim() ?? "";

  const t = await getTranslations({
    locale,
    namespace: "admin.tables",
  });

  const supabase = await createSupabaseServerClient();

  let tablesQuery = supabase
    .from("restaurant_tables")
    .select("*")
    .order("created_at", { ascending: true });

  if (searchQuery) {
    tablesQuery = tablesQuery.or(
      `slug.ilike.%${searchQuery}%,label.ilike.%${searchQuery}%,status.ilike.%${searchQuery}%`,
    );
  }

  const { data: tables, error } = await tablesQuery;

  if (error) {
    throw new Error(error.message);
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://192.168.0.11:3000";

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
              className="lg:w-[340px]"
            />

            <Link
              href={`/${currentLocale}/admin/tables/new`}
              className="inline-flex h-12 items-center justify-center gap-2 bg-brand-gold px-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-gold transition hover:bg-brand-goldLight"
            >
              <Plus className="h-4 w-4" />
              {t("addTable")}
            </Link>
          </div>

          {tables?.length === 0 ? (
            <div className="mt-6">
              <AdminEmptyState
                title={t("empty.title")}
                description={t("empty.description")}
                actionLabel={t("addTable")}
                actionHref={`/${currentLocale}/admin/tables/new`}
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tables?.map((table) => {
                const isActive = table.is_active && table.qr_active;

                return (
                  <div
                    key={table.id}
                    className="overflow-hidden border border-neutral-200 bg-[#FAF8F3]"
                  >
                    <div className="border-b border-neutral-200 bg-white p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold text-dark-bg">
                            {table.label}
                          </h3>

                          <div className="mt-2 inline-flex items-center gap-2 text-sm text-neutral-500">
                            <Users className="h-4 w-4 text-brand-gold" />
                            {table.capacity} {t("table.capacity")}
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isActive
                              ? "bg-status-active/10 text-status-active"
                              : "bg-status-inactive/10 text-status-inactive"
                          }`}
                        >
                          {isActive ? t("status.active") : t("status.inactive")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center border-b border-neutral-200 bg-white p-8">
                      <TableQrCode
                        url={`${siteUrl}/${currentLocale}/qr/${table.slug}`}
                        tableLabel={table.label}
                      />
                    </div>

                    <div className="space-y-4 p-5">
                      <div className="rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">
                          {t("table.qrUrl")}
                        </p>

                        <p className="mt-2 truncate text-sm font-medium text-dark-bg">
                          /{currentLocale}/qr/{table.slug}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/${currentLocale}/qr/${table.slug}`}
                          target="_blank"
                          className="flex h-11 flex-1 items-center justify-center gap-2 border border-neutral-200 bg-white text-sm font-semibold text-dark-bg transition hover:border-brand-gold hover:text-brand-gold"
                        >
                          <Eye className="h-4 w-4" />
                          {t("preview")}
                        </Link>

                        <Link
                          href={`/${currentLocale}/admin/tables/${table.id}/edit`}
                          className="flex h-11 w-11 items-center justify-center border border-neutral-200 bg-white transition hover:border-brand-gold hover:text-brand-gold"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>

                        <DeleteTableButton
                          action={deleteTableAction.bind(
                            null,
                            currentLocale,
                            table.id,
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
