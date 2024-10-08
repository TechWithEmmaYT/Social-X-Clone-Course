"use server";

import { auth } from "@/lib/auth";

export async function uploadFileAction(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return {
        messge: "Not logged in",
      };
    }
    const uploadUrl = "https://upload.uploadcare.com/base/";
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return {
        message: "Error uploading file",
      };
    }
    const data = await response.json();
    const uploadedUrl = `https://ucarecdn.com/${data.file}/`;
    return { uploadedUrl };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Upload error",
    };
  }
}
