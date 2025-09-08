import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("images") as File[];
  if (!files || files.length === 0) {
    return NextResponse.json({ error: "NO files Uploaded" });
  }
  const uploadedUrls: string[] = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: (() => {
          const fd = new FormData();
          fd.append("file", new Blob([buffer]), file.name);
          fd.append("upload_preset", uploadPreset || "");
          return fd;
        })(),
      }
    );
    const data = await cloudinaryRes.json();
    if (data.secure_url) {
      uploadedUrls.push(data.secure_url);
    }
  }
  return NextResponse.json({ urls: uploadedUrls });
}
