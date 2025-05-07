// src/services/uploadDonationImage.ts
import supabase from '../supabase/supabaseClient';


export const uploadDonationImage = async (
  file: File | null,
  userId: string,
  category: string
): Promise<string> => {
  if (!file) {
    const { data } = supabase.storage
      .from('donation-images')
      .getPublicUrl(`basic_images/${category}.jpg`);

    // If that exact category image doesn't exist, fallback to generic
    return data?.publicUrl ?? supabase.storage
      .from('donation-images')
      .getPublicUrl(`basic_images/default.jpg`).data.publicUrl;
  }

  const filePath = `${userId}/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from('donation-images')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from('donation-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
