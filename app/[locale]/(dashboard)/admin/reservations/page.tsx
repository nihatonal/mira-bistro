import { Check, X } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type Locale } from "@/i18n";

import { updateReservationStatusAction } from "./actions";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

type AdminReservationsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminReservationsPage({
  params,
}: AdminReservationsPageProps) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  const t = await getTranslations({
    locale,
    namespace: "admin.reservations",
  });

  const supabase = await createSupabaseServerClient();

  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <AdminHeader
        title={t("title")}
        description={t("description")}
        locale={currentLocale}
      />

      <main className="flex-1 p-6 lg:p-10">
        <div className="admin-card p-4 md:p-6">
          {reservations?.length === 0 ? (
            <AdminEmptyState
              title={t("empty.title")}
              description={t("empty.description")}
            />
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-[0.16em] text-neutral-500">
                      <th className="pb-4">{t("table.guest")}</th>
                      <th className="pb-4">{t("table.date")}</th>
                      <th className="pb-4">{t("table.time")}</th>
                      <th className="pb-4">{t("table.people")}</th>
                      <th className="pb-4">{t("table.status")}</th>
                      <th className="pb-4">{t("table.note")}</th>
                      <th className="pb-4 text-right">{t("table.actions")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservations?.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-b border-neutral-100 last:border-0"
                      >
                        <td className="py-5">
                          <div>
                            <p className="font-semibold text-dark-bg">
                              {reservation.name}
                            </p>
                            <p className="mt-1 text-sm text-neutral-500">
                              {reservation.phone}
                            </p>
                            {reservation.email && (
                              <p className="mt-1 text-xs text-neutral-400">
                                {reservation.email}
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="py-5 text-sm font-medium text-dark-bg">
                          {reservation.reservation_date}
                        </td>

                        <td className="py-5 text-sm text-neutral-600">
                          {reservation.reservation_time}
                        </td>

                        <td className="py-5 text-sm text-neutral-600">
                          {reservation.guest_count}
                        </td>

                        <td className="py-5">
                          <ReservationStatusBadge
                            status={reservation.status}
                            label={t(`status.${reservation.status}`)}
                          />
                        </td>

                        <td className="max-w-[240px] py-5 text-sm text-neutral-500">
                          <p className="line-clamp-2">
                            {reservation.note || "-"}
                          </p>
                        </td>

                        <td className="py-5">
                          <div className="flex justify-end gap-2">
                            <form
                              action={updateReservationStatusAction.bind(
                                null,
                                currentLocale,
                                reservation.id,
                                "confirmed",
                              )}
                            >
                              <button
                                type="submit"
                                className="flex h-10 w-10 items-center justify-center border border-neutral-200 text-status-active transition hover:border-status-active"
                                title={t("actions.confirm")}
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            </form>

                            <form
                              action={updateReservationStatusAction.bind(
                                null,
                                currentLocale,
                                reservation.id,
                                "cancelled",
                              )}
                            >
                              <button
                                type="submit"
                                className="flex h-10 w-10 items-center justify-center border border-neutral-200 text-status-inactive transition hover:border-status-inactive"
                                title={t("actions.cancel")}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-4 lg:hidden">
                {reservations?.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border border-neutral-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-dark-bg">
                          {reservation.name}
                        </h3>

                        <p className="mt-1 text-sm text-neutral-500">
                          {reservation.phone}
                        </p>

                        {reservation.email && (
                          <p className="mt-1 text-xs text-neutral-400">
                            {reservation.email}
                          </p>
                        )}
                      </div>

                      <ReservationStatusBadge
                        status={reservation.status}
                        label={t(`status.${reservation.status}`)}
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="border border-neutral-200 bg-[#FAF8F3] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                          {t("table.date")}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-dark-bg">
                          {reservation.reservation_date}
                        </p>
                      </div>

                      <div className="border border-neutral-200 bg-[#FAF8F3] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                          {t("table.time")}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-dark-bg">
                          {reservation.reservation_time}
                        </p>
                      </div>

                      <div className="border border-neutral-200 bg-[#FAF8F3] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                          {t("table.people")}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-dark-bg">
                          {reservation.guest_count}
                        </p>
                      </div>
                    </div>

                    {reservation.note && (
                      <div className="mt-5 border border-neutral-200 bg-white p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                          {t("table.note")}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                          {reservation.note}
                        </p>
                      </div>
                    )}

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <form
                        action={updateReservationStatusAction.bind(
                          null,
                          currentLocale,
                          reservation.id,
                          "confirmed",
                        )}
                      >
                        <button
                          type="submit"
                          className="flex h-11 w-full items-center justify-center gap-2 border border-status-active/30 bg-status-active/10 text-sm font-semibold text-status-active"
                        >
                          <Check className="h-4 w-4" />
                          {t("actions.confirm")}
                        </button>
                      </form>

                      <form
                        action={updateReservationStatusAction.bind(
                          null,
                          currentLocale,
                          reservation.id,
                          "cancelled",
                        )}
                      >
                        <button
                          type="submit"
                          className="flex h-11 w-full items-center justify-center gap-2 border border-status-inactive/30 bg-status-inactive/10 text-sm font-semibold text-status-inactive"
                        >
                          <X className="h-4 w-4" />
                          {t("actions.cancel")}
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function ReservationStatusBadge({
  status,
  label,
}: {
  status: string;
  label: string;
}) {
  const className =
    status === "confirmed"
      ? "bg-status-active/10 text-status-active"
      : status === "cancelled"
        ? "bg-status-inactive/10 text-status-inactive"
        : "bg-brand-gold/10 text-brand-gold";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}
