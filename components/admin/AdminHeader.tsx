import { Bell } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "../language/LanguageSwitcher";
import { type Locale } from "@/i18n";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/[locale]/(auth)/admin/login/actions";
type AdminHeaderProps = {
  title: string;
  description?: string;
  locale: Locale;
};

export async function AdminHeader({
  title,
  description,
  locale,
}: AdminHeaderProps) {
  const currentLocale = locale as Locale;
  const t = await getTranslations({
    locale: currentLocale,
    namespace: "admin.header",
  });
  const logout = logoutAction.bind(null, locale);
  return (
    <header className="flex h-24 items-center border-b border-neutral-200 bg-white px-6 lg:px-10">
      <div className="flex flex-1 items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-dark-bg">{title}</h1>

          {description && (
            <p className="mt-2 text-sm text-neutral-500">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex">
            <LanguageSwitcher currentLocale={locale} variant="light" />
          </div>

          <button
            type="button"
            className="relative flex h-12 w-12 items-center justify-center border border-neutral-200 bg-[#FAF8F3] transition hover:border-brand-gold"
          >
            <Bell className="h-5 w-5 text-dark-bg" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-gold" />
          </button>
          <form action={logout}>
            <button
              type="submit"
              className="flex h-12 w-12 items-center justify-center border border-neutral-200
               bg-[#FAF8F3] text-neutral-500 transition hover:border-red-400 hover:text-red-500"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </form>

          <div className="flex items-center gap-3 border border-neutral-200 bg-[#FAF8F3] px-4 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-white">
              A
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-dark-bg">
                {t("adminName")}
              </p>

              <p className="text-xs text-neutral-500">{t("adminRole")}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
