// src/services/uploadDonationImage.ts
import supabase from '../supabase/supabaseClient';

export const uploadDonationImage = async (
  file: File | null,
  userId: string,
  category: string
): Promise<string> => {
  if (!file) {
    // Return category-specific or default placeholder image
    return `https://pnspvpoweseinjpnqbtr.supabase.co/storage/v1/object/public/donation-images/basic_images/${category}.jpg`;
  }

  const filePath = `${userId}/${Date.now()}_${file.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('donation-images')
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type,
      cacheControl: '3600',
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // ✅ Public bucket – generate the URL directly
  const publicUrl = `https://pnspvpoweseinjpnqbtr.supabase.co/storage/v1/object/public/donation-images/${uploadData.path}`;
  return publicUrl;
};
