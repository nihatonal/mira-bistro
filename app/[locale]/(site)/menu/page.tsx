import { type Locale } from '@/i18n';
import { MenuPageClient } from '@/components/menu/MenuPageClient';

type MenuPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function MenuPage({ params }: MenuPageProps) {
  const { locale } = await params;

  return <MenuPageClient locale={locale as Locale} />;
}