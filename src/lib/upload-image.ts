export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body: formData }
  );
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error("Image upload failed. Please try another image.");
  }

  return data.data.url as string;
}