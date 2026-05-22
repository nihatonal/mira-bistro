import { CreditCard, QrCode, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { notFound } from "next/navigation";

type AdminDashboardPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const t = await getTranslations({
    locale,
    namespace: "admin.dashboard",
  });

  const stats = [
    {
      title: t("stats.totalProducts"),
      value: "48",
      icon: UtensilsCrossed,
    },
    {
      title: t("stats.qrTables"),
      value: "12",
      icon: QrCode,
    },
    {
      title: t("stats.ordersToday"),
      value: "126",
      icon: ShoppingBag,
    },
    {
      title: t("stats.revenue"),
      value: "₺24,300",
      icon: CreditCard,
    },
  ];

  return (
    <>
      <AdminHeader
        title={t("title")}
        description={t("description")}
        locale={locale as Locale}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 lg:p-10">
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.title} className="admin-card min-w-0 p-5 lg:p-6">
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 break-words text-sm leading-5 text-neutral-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-3 truncate text-3xl font-bold text-dark-bg sm:text-4xl">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid min-w-0 gap-6 xl:mt-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="admin-card min-w-0 p-5 lg:p-6">
            <h3 className="line-clamp-2 break-words text-xl font-semibold text-dark-bg">
              {t("recentOrders.title")}
            </h3>

            <p className="mt-1 line-clamp-2 break-words text-sm text-neutral-500">
              {t("recentOrders.description")}
            </p>

            <div className="mt-6 space-y-4 lg:mt-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex min-w-0 flex-col gap-3 border border-neutral-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-dark-bg">
                      {t("recentOrders.table")} {item}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                      2 {t("recentOrders.productsOrdered")}
                    </p>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <p className="font-semibold text-brand-gold">₺540</p>

                    <p className="mt-1 text-xs text-neutral-400">
                      2 {t("recentOrders.timeAgo")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card min-w-0 p-5 lg:p-6">
            <h3 className="line-clamp-2 break-words text-xl font-semibold text-dark-bg">
              {t("qrUsage.title")}
            </h3>

            <p className="mt-1 line-clamp-2 break-words text-sm text-neutral-500">
              {t("qrUsage.description")}
            </p>

            <div className="mt-6 space-y-5 lg:mt-8">
              {[
                { label: "Table 1", value: "84%" },
                { label: "Table 2", value: "65%" },
                { label: "Table 3", value: "92%" },
              ].map((item) => (
                <div key={item.label} className="min-w-0">
                  <div className="mb-2 flex min-w-0 items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate font-medium text-dark-bg">
                      {item.label}
                    </span>

                    <span className="shrink-0 text-neutral-500">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden bg-neutral-200">
                    <div
                      className="h-full bg-brand-gold"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
