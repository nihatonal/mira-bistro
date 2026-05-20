import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import {
  formatPreparationTime,
  formatPortion,
} from '@/lib/formatters';
import { type Locale } from '@/i18n';
import { type MenuItem } from '@/data/menu-items';
import { formatCurrency } from '@/lib/utils';

type MenuItemCardProps = {
  item: MenuItem;
  locale: Locale;
};

export function MenuItemCard({ item, locale }: MenuItemCardProps) {
  return (
    <Link
      href={`/${locale}/menu/${item.slug}`}
      className="group grid overflow-hidden border border-neutral-200 bg-[#FBF8F1] transition duration-300 hover:-translate-y-1 hover:shadow-cardHover sm:grid-cols-[180px_1fr]"
    >
      <div className="relative h-[220px] overflow-hidden sm:h-full">
        <Image
          src={item.image}
          alt={item.name[locale]}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 180px"
        />
      </div>

      <div className="flex flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold leading-tight text-dark-bg">
            {item.name[locale]}
          </h3>

          <span className="shrink-0 text-lg font-bold text-brand-gold">
            {formatCurrency(item.price)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-neutral-600">
          {item.description[locale]}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-brand-gold" />
            {formatPreparationTime(item.preparationMinutes, locale)}
          </span>

          <span>{formatPortion(item.portionCount, locale)}</span>

          {item.isVegetarian && (
            <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-brand-gold">
              Vegetarian
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}