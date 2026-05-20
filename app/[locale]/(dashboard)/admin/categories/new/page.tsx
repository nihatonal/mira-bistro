import { getTranslations } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { type Locale } from "@/i18n";
import { createCategoryAction } from "../actions";

type NewCategoryPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function NewCategoryPage({
  params,
}: NewCategoryPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "admin.categories.form",
  });

  const createAction = createCategoryAction.bind(null, locale);

  return (
    <>
      <AdminHeader
        title={t("addTitle")}
        description={t("addDescription")}
        locale={locale as Locale}
      />

      <CategoryForm
        locale={locale as Locale}
        mode="create"
        action={createAction}
      />
    </>
  );
}
