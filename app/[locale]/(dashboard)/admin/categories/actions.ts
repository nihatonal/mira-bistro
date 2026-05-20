'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[ğ]/g, 'g')
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function checkboxValue(formData: FormData, key: string) {
  return formData.get(key) === 'on';
}

export async function createCategoryAction(locale: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const nameTr = String(formData.get('name_tr') || '').trim();
  const nameEn = String(formData.get('name_en') || '').trim();
  const nameRu = String(formData.get('name_ru') || '').trim();

  const slug =
    String(formData.get('slug') || '').trim() || slugify(nameTr);

  const { error } = await supabase.from('categories').insert({
    slug,
    name_tr: nameTr,
    name_en: nameEn || nameTr,
    name_ru: nameRu || nameTr,
    description_tr: String(formData.get('description_tr') || ''),
    description_en: String(formData.get('description_en') || ''),
    description_ru: String(formData.get('description_ru') || ''),
    is_featured: checkboxValue(formData, 'is_featured'),
    is_active: checkboxValue(formData, 'is_active'),
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/categories`);
  redirect(`/${locale}/admin/categories`);
}

export async function updateCategoryAction(
  locale: string,
  categoryId: string,
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();

  const nameTr = String(formData.get('name_tr') || '').trim();
  const nameEn = String(formData.get('name_en') || '').trim();
  const nameRu = String(formData.get('name_ru') || '').trim();

  const slug =
    String(formData.get('slug') || '').trim() || slugify(nameTr);

  const { error } = await supabase
    .from('categories')
    .update({
      slug,
      name_tr: nameTr,
      name_en: nameEn || nameTr,
      name_ru: nameRu || nameTr,
      description_tr: String(formData.get('description_tr') || ''),
      description_en: String(formData.get('description_en') || ''),
      description_ru: String(formData.get('description_ru') || ''),
      is_featured: checkboxValue(formData, 'is_featured'),
      is_active: checkboxValue(formData, 'is_active'),
    })
    .eq('id', categoryId);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/categories`);
  redirect(`/${locale}/admin/categories`);
}

export async function deleteCategoryAction(locale: string, categoryId: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/categories`);
}