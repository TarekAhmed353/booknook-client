"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { categories, type Book } from "@/lib/books";
import { uploadImage } from "@/lib/upload-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditBookDialogProps = {
  book: Book;
};

export function EditBookDialog({ book }: EditBookDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>(book.category);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(book.image);
  const [loading, setLoading] = useState(false);

  const borrowedCount = book.totalCopies - book.availableCopies;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setCategory(book.category);
      setImageFile(null);
      setPreview(book.image);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setLoading(true);
    try {
      const image = imageFile ? await uploadImage(imageFile) : book.image;
      await apiFetch(`/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category,
          totalCopies: Number(form.get("totalCopies")),
          description: form.get("description"),
          image,
        }),
      });
      toast.success("Book updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-primary">Edit book</DialogTitle>
          <DialogDescription>Change any details below and save.</DialogDescription>
        </DialogHeader>

        <form id={`edit-${book._id}`} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`title-${book._id}`}>Book Title</Label>
              <Input id={`title-${book._id}`} name="title" defaultValue={book.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`author-${book._id}`}>Author Name</Label>
              <Input id={`author-${book._id}`} name="author" defaultValue={book.author} required />
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
              <Label htmlFor={`copies-${book._id}`}>Total Copies</Label>
              <Input
                id={`copies-${book._id}`}
                name="totalCopies"
                type="number"
                min={Math.max(1, borrowedCount)}
                defaultValue={book.totalCopies}
                required
              />
              {borrowedCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  {borrowedCount} {borrowedCount === 1 ? "copy is" : "copies are"} borrowed right now.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`image-${book._id}`}>Book Image</Label>
            <label
              htmlFor={`image-${book._id}`}
              className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-3 transition-colors hover:border-primary hover:bg-accent/40"
            >
              <span className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={preview} alt="Cover preview" fill unoptimized className="object-cover" />
              </span>
              <span className="text-sm">
                <span className="font-medium text-primary">Change image</span>
                <span className="mt-1 block text-muted-foreground">
                  {imageFile ? imageFile.name : "Leave it as it is to keep the current cover."}
                </span>
              </span>
            </label>
            <input
              id={`image-${book._id}`}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${book._id}`}>Short Description</Label>
            <Textarea
              id={`description-${book._id}`}
              name="description"
              rows={4}
              defaultValue={book.description}
              required
            />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form={`edit-${book._id}`} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}