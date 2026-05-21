import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';

import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutChef } from '@/components/about/AboutChef';
import { AboutExperience } from '@/components/about/AboutExperience';
import { AboutStats } from '@/components/about/AboutStats';
import { AboutCta } from '@/components/about/AboutCta';

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

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