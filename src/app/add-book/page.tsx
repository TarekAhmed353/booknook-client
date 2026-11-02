import type { Metadata } from "next";
import { AddBookForm } from "@/components/add-book-form";

export const metadata: Metadata = {
  title: "Add Book",
};

export default function AddBookPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass">
          Grow the shelves
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
          Add a New Book
        </h1>
        <p className="mt-3 text-muted-foreground">
          Share a book with other readers. Fill in the details below.
        </p>
      </div>
      <AddBookForm />
    </main>
  );
}