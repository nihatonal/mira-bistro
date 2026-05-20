import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Lock, Mail } from "lucide-react";

import { locales, type Locale } from "@/i18n";
import { notFound } from "next/navigation";
import { loginAction } from "./actions";

type AdminLoginPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminLoginPage({ params }: AdminLoginPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const currentLocale = locale as Locale;
  const t = await getTranslations({
    locale: currentLocale,
    namespace: "adminLogin",
  });

  const action = loginAction.bind(null, currentLocale);

  return (
    <main className="relative min-h-screen overflow-hidden bg-dark-bg text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,151,63,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,177,92,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,13,9,0.96),rgba(31,26,19,0.94))]" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
        <div className="w-full max-w-[460px]">
          <div className="mb-10 text-center">
            <Link href={`/${currentLocale}`} className="inline-block">
              <div className="leading-none">
                <div className="font-display text-5xl tracking-[0.18em]">
                  MIRA
                </div>
                <div className="mt-2 text-xs tracking-[0.38em] text-white/70">
                  BISTRO
                </div>
              </div>
            </Link>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
              {t("label")}
            </p>

            <h1 className="mt-4 font-display text-4xl font-semibold">
              {t("title")}
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/60">
              {t("description")}
            </p>
          </div>

          <form
            action={action}
            className="border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl md:p-8"
          >
            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
              >
                {t("email")}
              </label>

              <div className="mt-3 flex h-14   items-center gap-3 border border-white/10 bg-black/20 px-4">
                <Mail className="h-5 w-5 text-brand-gold" />
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="admin@mirabistro.com"
                  className=" h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
              >
                {t("password")}
              </label>

              <div className="mt-3 flex h-14 items-center gap-3 border border-white/10 bg-black/20 px-4">
                <Lock className="h-5 w-5 text-brand-gold" />
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-sm text-white/60">
                <input type="checkbox" className="h-4 w-4 accent-brand-gold" />
                {t("remember")}
              </label>

              <Link
                href={`/${currentLocale}`}
                className="text-sm font-semibold text-brand-gold hover:text-brand-goldLight"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              className="mt-8 flex h-14 w-full items-center justify-center bg-brand-gold text-sm font-bold uppercase tracking-[0.18em] text-white shadow-gold transition hover:bg-brand-goldLight active:bg-brand-goldDark"
            >
              {t("loginButton")}
            </button>

            <div className="mt-6 border border-brand-gold/20 bg-brand-gold/10 p-4 text-sm leading-7 text-white/70">
              <span className="font-semibold text-brand-gold">
                {t("demoTitle")}
              </span>{" "}
              {t("demoText")}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
