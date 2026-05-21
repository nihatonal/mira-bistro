import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

import { type Locale } from '@/i18n';

type AboutStatsProps = {
  locale: Locale;
};

export async function AboutStats({ locale }: AboutStatsProps) {
  const t = await getTranslations({
    locale,
    namespace: 'aboutPage.stats',
  });

  const stats = [
    {
      value: '12+',
      label: t('years'),
    },
    {
      value: '25K+',
      label: t('guests'),
    },
    {
      value: '80+',
      label: t('recipes'),
    },
    {
      value: '100%',
      label: t('quality'),
    },
  ];

  return (
    <section className="bg-[#FBF8F1] py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={0.08 * (index + 1)}
            >
              <div className="border border-neutral-200 bg-white p-10 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover">
                <div className="font-display text-5xl font-semibold text-brand-gold md:text-6xl">
                  {stat.value}
                </div>

                <div className="mx-auto mt-5 h-px w-16 bg-brand-gold" />

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}