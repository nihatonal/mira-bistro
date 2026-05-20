import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { type Locale } from '@/i18n';

type SiteLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function SiteLayout({
  children,
  params,
}: SiteLayoutProps) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale as Locale} />
      {children}
      <Footer locale={locale as Locale} />
    </>
  );
}