'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  QrCode,
  Settings,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { type Locale } from '@/i18n';
import { LanguageSwitcher } from '../language/LanguageSwitcher';

type AdminSidebarProps = {
  locale: Locale;
  mobile?: boolean;
  onNavigate?: () => void;
};

const navItems = [
  {
    key: 'dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    key: 'products',
    href: '/admin/products',
    icon: UtensilsCrossed,
  },
  {
    key: 'categories',
    href: '/admin/categories',
    icon: Tags,
  },
  {
    key: 'tables',
    href: '/admin/tables',
    icon: QrCode,
  },
  {
    key: 'settings',
    href: '/admin/settings',
    icon: Settings,
  },
] as const;

export function AdminSidebar({
  locale,
  mobile = false,
   onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('admin.sidebar');

  return (
    <aside
      className={cn(
        'w-[280px] shrink-0 border-r border-dark-border bg-dark-surface',
        mobile ? 'flex h-full flex-col' : 'hidden lg:flex lg:flex-col'
      )}
    >
      <div className="flex h-24 items-center border-b border-dark-border px-8">
        <Link href={`/${locale}`} onClick={onNavigate}>
          <div className="leading-none text-white">
            <div className="font-display text-3xl tracking-[0.18em]">
              MIRA
            </div>

            <div className="mt-1 text-[10px] tracking-[0.34em] text-white/60">
              ADMIN PANEL
            </div>
          </div>
        </Link>
      </div>

      <nav
        className={cn(
          'flex flex-1 flex-col',
          mobile ? 'gap-3 p-5 pt-8' : 'gap-2 p-5'
        )}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const href = `/${locale}${item.href}`;

          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={item.key}
              href={href}
              onClick={onNavigate}
              className={cn(
                'group relative py-2 flex items-center gap-4 transition',
                mobile
                  ? 'rounded-2xl px-5 py-4 text-base font-semibold'
                  : 'h-13 px-4 text-sm font-semibold',
                isActive
                  ? 'bg-brand-gold text-white shadow-gold'
                  : 'text-white/65 hover:bg-white/5 hover:text-white'
              )}
            >
              {isActive && mobile && (
                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white/80" />
              )}

              <span
                className={cn(
                  'flex items-center justify-center transition',
                  mobile ? 'h-10 w-10 rounded-xl' : '',
                  isActive
                    ? mobile
                      ? 'bg-white/15 text-white'
                      : 'text-white'
                    : mobile
                      ? 'bg-white/5 text-brand-gold group-hover:bg-white/10'
                      : 'text-white/70 group-hover:text-brand-gold'
                )}
              >
                <Icon className={cn(mobile ? 'h-5 w-5' : 'h-5 w-5')} />
              </span>

              <span>{t(item.key)}</span>
            </Link>
          );
        })}
      </nav>


      {mobile && (
        <div className="border-t border-white/10 p-5">
           <LanguageSwitcher  currentLocale={locale} variant="light" />
          <p className="text-xs leading-6 mt-2 text-white/45">
            Mira Bistro admin yönetim paneli
          </p>
        </div>
      )}
    </aside>
  );
}