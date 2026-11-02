"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { categories } from "@/lib/books";
import { uploadImage } from "@/lib/upload-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddBookForm() {
  const { data: session } = authClient.useSession();
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    if (!category) {
      toast.error("Please choose a category.");
      return;
    }
    if (!imageFile) {
      toast.error("Please choose a book cover image.");
      return;
    }

    setLoading(true);
    try {
      const image = await uploadImage(imageFile);
      await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category,
          totalCopies: Number(form.get("totalCopies")),
          description: form.get("description"),
          image,
        }),
      });
      toast.success("Book added to the library!");
      formElement.reset();
      setCategory("");
      setImageFile(null);
      setPreview("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input id="title" name="title" placeholder="The Night Library" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input id="author" name="author" placeholder="Matt Haig" required />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalCopies">Total Copies</Label>
          <Input
            id="totalCopies"
            name="totalCopies"
            type="number"
            min={1}
            defaultValue={1}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Book Image</Label>
        <label
          htmlFor="image"
          className="flex cursor-pointer items-center gap-5 rounded-xl border-2 border-dashed p-4 transition-colors hover:border-primary hover:bg-accent/40"
        >
          <span className="relative grid h-32 w-24 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted">
            {preview ? (
              <Image src={preview} alt="Cover preview" fill unoptimized className="object-cover" />
            ) : (
              <ImagePlus className="size-8 text-muted-foreground" />
            )}
          </span>
          <span className="text-sm">
            <span className="font-medium text-primary">
              {imageFile ? "Change image" : "Choose a cover image"}
            </span>
            <span className="mt-1 block text-muted-foreground">
              {imageFile ? imageFile.name : "JPG, PNG or WEBP. It will be uploaded to imgbb."}
            </span>
          </span>
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="sr-only"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          placeholder="What is this book about?"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="userName">Your Name</Label>
          <Input
            id="userName"
            value={session?.user.name ?? ""}
            readOnly
            className="bg-muted text-muted-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userEmail">Your Email</Label>
          <Input
            id="userEmail"
            value={session?.user.email ?? ""}
            readOnly
            className="bg-muted text-muted-foreground"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading && <Loader2 className="animate-spin" />}
        {loading ? "Adding book..." : "Add Book"}
      </Button>
    </form>
  );
}