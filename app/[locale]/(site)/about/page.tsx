import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';

import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutChef } from '@/components/about/AboutChef';
import { AboutExperience } from '@/components/about/AboutExperience';
import { AboutStats } from '@/components/about/AboutStats';
import { AboutCta } from '@/components/about/AboutCta';
import { createMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'metadata.about',
  });

  return createMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/about',
    image: '/og/about.webp',
  });
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <main className="overflow-hidden">
      <AboutHero locale={currentLocale} />

      <AboutStory locale={currentLocale} />

      <AboutChef locale={currentLocale} />

      <AboutExperience locale={currentLocale} />

      <AboutStats locale={currentLocale} />

      <AboutCta locale={currentLocale} />
    </main>
  );
}