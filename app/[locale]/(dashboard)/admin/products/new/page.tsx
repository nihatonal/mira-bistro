import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { getTranslations } from "next-intl/server";
import { categories } from "@/data/categories";
import { type Locale } from "@/i18n";
import { createProductAction } from "../actions";

type NewProductPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function NewProductPage({ params }: NewProductPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "admin.products.form",
  });

  const createAction = createProductAction.bind(null, locale);

  return (
    <>
      <AdminHeader title={t("addTitle")} description={t("addDescription")} locale={locale as Locale}/>

      <ProductForm
        locale={locale as Locale}
        mode="create"
        categories={categories}
        action={createAction}
      />
    </>
  );
}
