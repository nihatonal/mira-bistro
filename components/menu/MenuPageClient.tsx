'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  menuCategories,
  menuItems,
  type MenuCategory,
} from '@/data/menu-items';

import { type Locale } from '@/i18n';

import { Container } from '@/components/layout/Container';
import { MenuCategoryFilter } from '@/components/menu/MenuCategoryFilter';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

type MenuPageClientProps = {
  locale: Locale;
};

export function MenuPageClient({ locale }: MenuPageClientProps) {
  const t = useTranslations('menuPage');

  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>(
    'all'
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const categoryLabels: Record<MenuCategory | 'all', string> = {
    all: t('all'),
    starters: t('starters'),
    salads: t('salads'),
    mains: t('mains'),
    burgers: t('burgers'),
    pasta: t('pasta'),
    desserts: t('desserts'),
    drinks: t('drinks'),
  };

  return (
    <main className="min-h-screen bg-[#FBF8F1] pb-24 pt-36">
      <Container>
        <Reveal>
          <SectionHeading
            centered
            label={t('label')}
            title={t('title')}
            description={t('description')}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <MenuCategoryFilter
              categories={menuCategories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
              labels={categoryLabels}
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-8">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </Reveal>
      </Container>
    </main>
  );
}