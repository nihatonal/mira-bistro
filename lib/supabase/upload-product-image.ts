import { createBrowserClient } from '@/lib/supabase/browser';

type UploadProductImageArgs = {
  file: File;
  slug: string;
};

export async function uploadProductImage({
  file,
  slug,
}: UploadProductImageArgs) {
  const supabase = createBrowserClient();

  const fileExt = file.name.split('.').pop();
  const safeSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
  const fileName = `${safeSlug}-${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}