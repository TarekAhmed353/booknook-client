import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Book",
};

export default function AddBookPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-primary">Add Book</h1>
      <p className="mt-3 text-muted-foreground">
        The form for adding a new book will go here.
      </p>
    </main>
  );
}