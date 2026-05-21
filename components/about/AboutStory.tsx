import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { type Locale } from '@/i18n';

type AboutStoryProps = {
  locale: Locale;
};

export async function AboutStory({ locale }: AboutStoryProps) {
  const t = await getTranslations({
    locale,
    namespace: 'aboutPage.story',
  });

  return (
    <section className="bg-[#FBF8F1] py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="section-label">{t('label')}</p>

              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-dark-bg md:text-6xl">
                {t('title')}
              </h2>

              <div className="mt-8 space-y-6 text-base leading-8 text-neutral-600">
                <p>{t('description1')}</p>
                <p>{t('description2')}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <div className="relative h-[520px] overflow-hidden border border-neutral-200 bg-white shadow-card">
                <Image
                  src="/images/about/about-story.webp"
                  alt="Mira Bistro story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="absolute -bottom-8 -left-8 hidden border border-neutral-200 bg-white p-6 shadow-card md:block">
                <p className="font-display text-4xl text-brand-gold">
                  Mira
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-neutral-500">
                  Bistro
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}