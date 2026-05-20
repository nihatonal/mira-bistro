'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function loginAction(locale: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/${locale}/admin/login?error=invalid`);
  }

  redirect(`/${locale}/admin`);
}

export async function logoutAction(locale: string) {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect(`/${locale}/admin/login`);
}