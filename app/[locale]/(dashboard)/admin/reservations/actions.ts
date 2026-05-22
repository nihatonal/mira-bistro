"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateReservationStatusAction(
  locale: string,
  reservationId: string,
  status: "pending" | "confirmed" | "cancelled",
) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", reservationId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${locale}/admin/reservations`);
}