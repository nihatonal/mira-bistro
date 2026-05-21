import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { type Locale } from '@/i18n';

type AboutChefProps = {
  locale: Locale;
};

export async function AboutChef({ locale }: AboutChefProps) {
  const t = await getTranslations({
    locale,
    namespace: 'aboutPage.chef',
  });

  const features = [t('feature1'), t('feature2'), t('feature3')];

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative h-[560px] overflow-hidden border border-neutral-200 shadow-card">
              <Image
                src="/images/about/about-chef.webp"
                alt="Mira Bistro kitchen team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <p className="section-label">{t('label')}</p>

              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-dark-bg md:text-6xl">
                {t('title')}
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600">
                {t('description')}
              </p>

              <div className="mt-9 grid gap-4">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 border border-neutral-200 bg-[#FBF8F1] p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                    <span className="font-semibold text-dark-bg">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}