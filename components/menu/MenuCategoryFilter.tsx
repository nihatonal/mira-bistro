'use client';

import { cn } from '@/lib/utils';
import { type MenuCategory } from '@/data/menu-items';

type MenuCategoryFilterProps = {
  categories: MenuCategory[];
  activeCategory: MenuCategory | 'all';
  onChange: (category: MenuCategory | 'all') => void;
  labels: Record<MenuCategory | 'all', string>;
};

export function MenuCategoryFilter({
  categories,
  activeCategory,
  onChange,
  labels,
}: MenuCategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {(['all', ...categories] as Array<MenuCategory | 'all'>).map(
        (category) => (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={cn(
              'rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition',
              activeCategory === category
                ? 'border-brand-gold bg-brand-gold text-white shadow-gold'
                : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-gold hover:text-brand-gold'
            )}
          >
            {labels[category]}
          </button>
        )
      )}
    </div>
  );
}