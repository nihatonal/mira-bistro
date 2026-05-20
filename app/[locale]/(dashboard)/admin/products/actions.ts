"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function checkboxValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function createProductAction(locale: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const nameTr = String(formData.get("name_tr") || "").trim();
  const nameEn = String(formData.get("name_en") || "").trim();
  const nameRu = String(formData.get("name_ru") || "").trim();

  const descriptionTr = String(formData.get("description_tr") || "").trim();
  const descriptionEn = String(formData.get("description_en") || "").trim();
  const descriptionRu = String(formData.get("description_ru") || "").trim();
  const categorySlug = String(formData.get("category_slug") || "");

  const imageUrl = String(formData.get("image_url") || "");
  const priceTry = Number(formData.get("price_try") || 0);
  const priceUsd = Number(formData.get("price_usd") || 0);
  const slug = slugify(nameTr);

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (categoryError || !category) {
    throw new Error("Category not found");
  }

  const { error } = await supabase.from("products").insert({
    category_id: category.id,
    slug,

    name_tr: nameTr,
    name_en: nameEn || nameTr,
    name_ru: nameRu || nameTr,

    description_tr: descriptionTr,
    description_en: descriptionEn || descriptionTr,
    description_ru: descriptionRu || descriptionTr,

    image_url: imageUrl,

    price_try: priceTry,
    price_usd: priceUsd,

    preparation_minutes: Number(formData.get("preparation_minutes") || 0),

    portion_count: Number(formData.get("portion_count") || 1),

    is_vegetarian: checkboxValue(formData, "is_vegetarian"),
    is_vegan: checkboxValue(formData, "is_vegan"),
    is_gluten_free: checkboxValue(formData, "is_gluten_free"),
    is_featured: checkboxValue(formData, "is_featured"),
    is_active: checkboxValue(formData, "is_active"),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${locale}/admin/products`);
  redirect(`/${locale}/admin/products`);
}

export async function updateProductAction(
  locale: string,
  productId: string,
  formData: FormData,
) {
  const supabase = await createSupabaseServerClient();

  const nameTr = String(formData.get("name_tr") || "").trim();
  const nameEn = String(formData.get("name_en") || "").trim();
  const nameRu = String(formData.get("name_ru") || "").trim();

  const descriptionTr = String(formData.get("description_tr") || "").trim();
  const descriptionEn = String(formData.get("description_en") || "").trim();
  const descriptionRu = String(formData.get("description_ru") || "").trim();

  const categorySlug = String(formData.get("category_slug") || "");
  const imageUrl = String(formData.get("image_url") || "");
  const priceTry = Number(formData.get("price_try") || 0);
  const priceUsd = Number(formData.get("price_usd") || 0);

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (categoryError || !category) {
    console.log("CATEGORY ERROR:", categoryError);
    throw new Error("Category not found");
  }

  const { data: updatedProduct, error } = await supabase
    .from("products")
    .update({
      category_id: category.id,

      name_tr: nameTr,
      name_en: nameEn || nameTr,
      name_ru: nameRu || nameTr,

      description_tr: descriptionTr,
      description_en: descriptionEn || descriptionTr,
      description_ru: descriptionRu || descriptionTr,

      image_url: imageUrl,

      price_try: priceTry,
      price_usd: priceUsd,

      preparation_minutes: Number(formData.get("preparation_minutes") || 0),
      portion_count: Number(formData.get("portion_count") || 1),

      is_vegetarian: checkboxValue(formData, "is_vegetarian"),
      is_vegan: checkboxValue(formData, "is_vegan"),
      is_gluten_free: checkboxValue(formData, "is_gluten_free"),
      is_featured: checkboxValue(formData, "is_featured"),
      is_active: checkboxValue(formData, "is_active"),
    })
    .eq("id", productId)
    .select("id")
    .single();

  if (error) {
    console.log("UPDATE ERROR:", error);
    throw new Error(error.message);
  }

  if (!updatedProduct) {
    throw new Error("Product update failed");
  }

  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}/admin/products/${productId}/edit`);
  revalidatePath(`/${locale}/menu`);

  redirect(`/${locale}/admin/products`);
}

export async function deleteProductAction(locale: string, productId: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${locale}/admin/products`);
}
