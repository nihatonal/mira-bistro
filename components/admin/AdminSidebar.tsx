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

type AdminSidebarProps = {
  locale: Locale;
};

const items = [
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

export function AdminSidebar({ locale }: AdminSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('admin.sidebar');

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-dark-border bg-dark-surface lg:flex lg:flex-col">
      <div className="flex h-24 items-center border-b border-dark-border px-8">
        <Link href={`/${locale}`}>
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

      <nav className="flex flex-1 flex-col gap-2 p-5">
        {items.map((item) => {
          const Icon = item.icon;
          const href = `/${locale}${item.href}`;

          const isActive =
            pathname === href ||
            pathname.startsWith(`${href}/`);

          return (
            <Link
              key={item.key}
              href={href}
              className={cn(
                'flex h-14 items-center gap-3 px-4 text-sm font-semibold transition',
                isActive
                  ? 'bg-brand-gold text-white shadow-gold'
                  : 'text-white/70 hover:bg-dark-card hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{t(item.key)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}