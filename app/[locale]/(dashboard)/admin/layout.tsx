import { ReactNode } from "react";

import { type Locale } from "@/i18n";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type AdminLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="flex min-h-screen bg-admin-content">
      <AdminSidebar locale={locale as Locale} />

      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
