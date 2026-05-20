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

      <main className="flex-1 p-6 lg:p-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.title} className="admin-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">{stat.title}</p>

                    <h2 className="mt-3 text-4xl font-bold text-dark-bg">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="admin-card p-6">
            <h3 className="text-xl font-semibold text-dark-bg">
              {t("recentOrders.title")}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {t("recentOrders.description")}
            </p>

            <div className="mt-8 space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border border-neutral-200 p-4"
                >
                  <div>
                    <p className="font-semibold text-dark-bg">
                      {t("recentOrders.table")} {item}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      2 {t("recentOrders.productsOrdered")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-brand-gold">₺540</p>

                    <p className="mt-1 text-xs text-neutral-400">
                      2 {t("recentOrders.timeAgo")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card p-6">
            <h3 className="text-xl font-semibold text-dark-bg">
              {t("qrUsage.title")}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {t("qrUsage.description")}
            </p>

            <div className="mt-8 space-y-5">
              {[
                { label: "Table 1", value: "84%" },
                { label: "Table 2", value: "65%" },
                { label: "Table 3", value: "92%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-dark-bg">
                      {item.label}
                    </span>

                    <span className="text-neutral-500">{item.value}</span>
                  </div>

                  <div className="h-2 bg-neutral-200">
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
