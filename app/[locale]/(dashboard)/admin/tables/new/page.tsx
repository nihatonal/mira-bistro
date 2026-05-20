import { getTranslations } from 'next-intl/server';

import { AdminHeader } from '@/components/admin/AdminHeader';
import { TableForm } from '@/components/admin/tables/TableForm';

import { type Locale } from '@/i18n';
import { createTableAction } from '../actions';

type NewTablePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function NewTablePage({
  params,
}: NewTablePageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'admin.tables.form',
  });

  const createAction = createTableAction.bind(null, locale);

  return (
    <>
      <AdminHeader
        title={t('addTitle')}
        description={t('addDescription')}
        locale={locale as Locale}
      />

      <TableForm
        locale={locale as Locale}
        mode="create"
        action={createAction}
      />
    </>
  );
}