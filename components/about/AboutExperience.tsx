import {
  Music2,
  Sparkles,
  Wine,
} from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

import { type Locale } from '@/i18n';

type AboutExperienceProps = {
  locale: Locale;
};

export async function AboutExperience({
  locale,
}: AboutExperienceProps) {
  const t = await getTranslations({
    locale,
    namespace: 'aboutPage.experience',
  });

  const items = [
    {
      title: t('ambience'),
      icon: Sparkles,
    },
    {
      title: t('service'),
      icon: Wine,
    },
    {
      title: t('taste'),
      icon: Music2,
    },
  ];

  return (
    <section className="bg-dark-bg py-24 text-white">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center text-brand-gold">
              {t('label')}
            </p>

            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-6xl">
              {t('title')}
            </h2>

            <p className="mt-7 text-lg leading-9 text-white/70">
              {t('description')}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={0.08 * (index + 1)}
              >
                <div className="border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <div className="mt-5 h-px w-16 bg-brand-gold" />

                  <p className="mt-6 text-sm leading-7 text-white/65">
                    Mira Bistro premium dining experience.
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}