import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/i18n';

import { ContactHero } from '@/components/contact/ContactHero';
import { ContactCards } from '@/components/contact/ContactCards';
import { WorkingHours } from '@/components/contact/WorkingHours';
import { ContactMap } from '@/components/contact/ContactMap';
import { ContactCta } from '@/components/contact/ContactCta';

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ContactPage({
  params,
}: ContactPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <main className="overflow-hidden">
      <ContactHero locale={currentLocale} />

      <ContactCards locale={currentLocale} />

      <WorkingHours locale={currentLocale} />

      <ContactMap locale={currentLocale} />

      <ContactCta locale={currentLocale} />
    </main>
  );
}