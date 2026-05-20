import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { type Locale } from '@/i18n';

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-dark-bg py-16 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href={`/${locale}`} className="inline-block">
              <div className="text-center leading-none">
                <div className="text-4xl font-display tracking-[0.18em]">
                  MIRA
                </div>
                <div className="mt-1 text-xs tracking-[0.35em] text-white/70">
                  BISTRO
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/60">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
              {t('quick_links')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li><Link href={`/${locale}`}>Ana Sayfa</Link></li>
              <li><Link href={`/${locale}/about`}>Hakkımızda</Link></li>
              <li><Link href={`/${locale}/menu`}>Menü</Link></li>
              <li><Link href={`/${locale}/gallery`}>Galeri</Link></li>
              <li><Link href={`/${locale}/contact`}>İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
              {t('menu_label')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li>Başlangıçlar</li>
              <li>Salatalar</li>
              <li>Ana Yemekler</li>
              <li>Tatlılar</li>
              <li>İçecekler</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
              {t('contact_label')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li>Cumhuriyet Cad. No: 12</li>
              <li>Kadıköy / İstanbul</li>
              <li>+90 555 123 45 67</li>
              <li>info@mirabistro.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          {t('copyright')}
        </div>
      </Container>
    </footer>
  );
}