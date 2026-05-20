import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Leaf, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { formatPreparationTime, formatPortion } from "@/lib/formatters";
import { menuItems } from "@/data/menu-items";
import { locales, type Locale } from "@/i18n";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatCurrency } from "@/lib/utils";

type ProductDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams?: Promise<{
    source?: string;
    table?: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    menuItems.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const query = await searchParams;

  const isQrSource = query?.source === "qr" && query?.table;

  if (!locales.includes(locale as Locale)) notFound();

  const currentLocale = locale as Locale;
  const t = await getTranslations({
    locale: currentLocale,
    namespace: "productDetail",
  });

  const item = menuItems.find((menuItem) => menuItem.slug === slug);

  if (!item) notFound();

  const relatedItems = menuItems
    .filter(
      (menuItem) =>
        menuItem.category === item.category && menuItem.id !== item.id,
    )
    .slice(0, 3);

  const backHref = isQrSource
    ? `/${currentLocale}/qr/${query.table}`
    : `/${currentLocale}/menu`;

  return (
    <main className="min-h-screen bg-[#FBF8F1] pb-24 pt-12">
      <Container>
        <Reveal>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-gold transition hover:text-brand-goldDark"
          >
            <ArrowLeft className="h-4 w-4" />
            {isQrSource ? t("backToQrMenu") : t("viewFullMenu")}
          </Link>
        </Reveal>

        <section className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="overflow-hidden border border-neutral-200 bg-white shadow-card">
              <div className="relative h-[420px] w-full md:h-[620px]">
                <Image
                  src={item.image}
                  alt={item.name[currentLocale]}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center">
              <p className="section-label mb-4">
                {t(`categories.${item.category}`)}
              </p>

              <h1 className="font-display text-5xl font-semibold leading-tight text-dark-bg md:text-7xl">
                {item.name[currentLocale]}
              </h1>

              <p className="mt-6 text-lg leading-9 text-neutral-700">
                {item.description[currentLocale]}
              </p>

              <div className="mt-8 text-3xl font-bold text-brand-gold">
                {formatCurrency(item.price)}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 border border-neutral-200 bg-white p-5">
                  <Clock className="h-5 w-5 text-brand-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">
                      {t("preparationTime")}
                    </p>
                    <p className="mt-1 font-semibold text-dark-bg">
                      {formatPreparationTime(item.preparationMinutes, currentLocale)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border border-neutral-200 bg-white p-5">
                  <Users className="h-5 w-5 text-brand-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">
                      {t("portion")}
                    </p>
                    <p className="mt-1 font-semibold text-dark-bg">
                      {formatPortion(item.portionCount, currentLocale)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {item.isVegetarian && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-2 text-sm font-semibold text-brand-gold">
                    <Leaf className="h-4 w-4" />
                    {t("labels.vegetarian")}
                  </span>
                )}

                {item.isVegan && (
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {t("labels.vegan")}
                  </span>
                )}

                {item.isGlutenFree && (
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                    {t("labels.glutenFree")}
                  </span>
                )}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  href={`/${currentLocale}/menu`}
                  size="lg"
                  className="rounded-none px-10"
                >
                  {t("viewFullMenu")}
                </Button>

                <Button
                  href={`/${currentLocale}/reservations`}
                  variant="outline"
                  size="lg"
                  className="rounded-none px-10"
                >
                  {t("makeReservation")}
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        {relatedItems.length > 0 && (
          <Reveal delay={0.15}>
            <section className="mt-24">
              <div className="text-center">
                <p className="section-label justify-center">
                  {t("relatedLabel")}
                </p>

                <h2 className="mt-4 text-4xl font-semibold text-dark-bg md:text-5xl">
                  {t("relatedTitle")}
                </h2>

                <div className="mx-auto mt-5 h-px w-24 bg-brand-gold" />
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {relatedItems.map((related) => (
                  <Link
                    key={related.id}
                    href={`/${currentLocale}/menu/${related.slug}`}
                    className="group overflow-hidden border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-cardHover"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.name[currentLocale]}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-2xl font-semibold text-dark-bg">
                        {related.name[currentLocale]}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-sm leading-7 text-neutral-600">
                        {related.description[currentLocale]}
                      </p>

                      <p className="mt-5 font-bold text-brand-gold">
                        {formatCurrency(related.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </Container>
    </main>
  );
}
