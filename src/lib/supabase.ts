import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY
);

export const uploadFile = async (file: File) => {
  try {
    const fileName = `${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("imageUpload")
      .upload(`public/airplanes/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return fileName;
  } catch (e) {
    console.error("Error uploading fle:", e);
    return e;
  }
};

export const getUrlFile = (fileName: string) => {
  // If already a full URL (http/https), return as-is
  if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
    return fileName;
  }

  // Otherwise, generate Supabase URL
  const { data } = supabase.storage
    .from("imageUpload")
    .getPublicUrl(`public/airplanes/${fileName}`);
  return data.publicUrl;
};

export const deleteFile = async (filename: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("imageUpload")
      .remove([`public/airplanes/${filename}`]);

    if (error) {
      throw new Error(error?.message);
    }
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
