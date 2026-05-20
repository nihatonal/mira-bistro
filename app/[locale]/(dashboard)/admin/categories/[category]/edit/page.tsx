import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { AdminHeader } from '@/components/admin/AdminHeader';
import { CategoryForm } from '@/components/admin/categories/CategoryForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { type Locale } from '@/i18n';
import { updateCategoryAction } from '../../actions';

type EditCategoryPageProps = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { locale, category } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'admin.categories.form',
  });

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', category)
    .single();

  if (error || !data) notFound();

  const mappedCategory = {
    id: data.id,
    slug: data.slug,
    name: {
      tr: data.name_tr,
      en: data.name_en,
      ru: data.name_ru,
    },
    description: {
      tr: data.description_tr,
      en: data.description_en,
      ru: data.description_ru,
    },
    isActive: data.is_active,
    isFeatured: data.is_featured,
  };

  const updateAction = updateCategoryAction.bind(null, locale, data.id);

  return (
    <>
      <AdminHeader
        title={t('editTitle')}
        description={t('editDescription')}
      />

      <CategoryForm
        locale={locale as Locale}
        mode="edit"
        category={mappedCategory}
        action={updateAction}
      />
    </>
  );
}