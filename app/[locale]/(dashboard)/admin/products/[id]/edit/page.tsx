import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductForm } from "@/components/admin/products/ProductForm";

import { categories } from "@/data/categories";
import { type Locale } from "@/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateProductAction } from "../../actions";

type EditProductPageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { locale, id } = await params;

  const t = await getTranslations({
    locale,
    namespace: "admin.products.form",
  });

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      slug,
      name_tr,
      name_en,
      name_ru,
      description_tr,
      description_en,
      description_ru,
      image_url,
      price,
      preparation_minutes,
      portion_count,
      is_featured,
      is_vegetarian,
      is_vegan,
      is_gluten_free,
      is_active,
      categories (
        slug
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }
  const category = data.categories as {
    slug?: string;
  } | null;
  const product = {
    id: data.id,
    slug: data.slug,
    category: category?.slug ?? "pasta",
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
    price: Number(data.price),
    image: data.image_url || "/images/menu/fettuccine.png",
    preparationMinutes: data.preparation_minutes ?? 0,
    portionCount: data.portion_count ?? 1,
    isFeatured: data.is_featured,
    isVegetarian: data.is_vegetarian,
    isVegan: data.is_vegan,
    isGlutenFree: data.is_gluten_free,
  };

  const updateAction = updateProductAction.bind(null, locale, id);

  return (
    <>
      <AdminHeader title={t("editTitle")} description={t("editDescription")} />

      <ProductForm
        locale={locale as Locale}
        mode="edit"
        product={product}
        categories={categories}
        action={updateAction}
      />
    </>
  );
}
