import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Books",
};

export default function AllBooksPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-primary">All Books</h1>
      <p className="mt-3 text-muted-foreground">
        Every book in the BookNook library will show up here.
      </p>
    </main>
  );
}