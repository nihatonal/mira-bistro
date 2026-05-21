import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n';

import { GalleryHero } from '@/components/gallery/GalleryHero';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryCta } from '@/components/gallery/GalleryCta';

type GalleryPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function GalleryPage({
  params,
}: GalleryPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <main className="overflow-hidden">
      <GalleryHero locale={currentLocale} />
      <GalleryGrid locale={currentLocale} />
      <GalleryCta locale={currentLocale} />
    </main>
  );
}