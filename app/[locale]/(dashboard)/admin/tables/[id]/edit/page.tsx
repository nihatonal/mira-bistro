import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { AdminHeader } from '@/components/admin/AdminHeader';
import { TableForm } from '@/components/admin/tables/TableForm';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { type Locale } from '@/i18n';
import { updateTableAction } from '../../actions';

type EditTablePageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function EditTablePage({
  params,
}: EditTablePageProps) {
  const { locale, id } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'admin.tables.form',
  });

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('restaurant_tables')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  const table = {
    id: data.id,
    slug: data.slug,
    label: data.label,
    capacity: data.capacity,
    status: data.status,
    qrActive: data.qr_active,
    isActive: data.is_active,
  };

  const updateAction = updateTableAction.bind(null, locale, id);

  return (
    <>
      <AdminHeader
        title={t('editTitle')}
        description={t('editDescription')}
      />

      <TableForm
        locale={locale as Locale}
        mode="edit"
        table={table}
        action={updateAction}
      />
    </>
  );
}