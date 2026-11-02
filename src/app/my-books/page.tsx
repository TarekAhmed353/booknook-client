import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Books",
};

export default function MyBooksPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-primary">My Books</h1>
      <p className="mt-3 text-muted-foreground">
        The books you added, with edit and delete, will go here.
      </p>
    </main>
  );
}