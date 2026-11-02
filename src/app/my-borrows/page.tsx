import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Borrows",
};

export default function MyBorrowsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-primary">My Borrows</h1>
      <p className="mt-3 text-muted-foreground">
        The books you borrowed, with their return dates, will go here.
      </p>
    </main>
  );
}