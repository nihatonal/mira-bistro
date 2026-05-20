'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

export async function createTableAction(locale: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const label = String(formData.get('label') || '').trim();
  const slug = String(formData.get('slug') || '').trim() || slugify(label);

  const { error } = await supabase.from('restaurant_tables').insert({
    label,
    slug,
    capacity: Number(formData.get('capacity') || 1),
    status: String(formData.get('status') || 'available'),
    qr_active: checkboxValue(formData, 'qr_active'),
    is_active: checkboxValue(formData, 'is_active'),
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/tables`);
  redirect(`/${locale}/admin/tables`);
}

export async function updateTableAction(
  locale: string,
  tableId: string,
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();

  const label = String(formData.get('label') || '').trim();
  const slug = String(formData.get('slug') || '').trim() || slugify(label);

  const { error } = await supabase
    .from('restaurant_tables')
    .update({
      label,
      slug,
      capacity: Number(formData.get('capacity') || 1),
      status: String(formData.get('status') || 'available'),
      qr_active: checkboxValue(formData, 'qr_active'),
      is_active: checkboxValue(formData, 'is_active'),
    })
    .eq('id', tableId);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/tables`);
  redirect(`/${locale}/admin/tables`);
}

export async function deleteTableAction(locale: string, tableId: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from('restaurant_tables')
    .delete()
    .eq('id', tableId);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/tables`);
}