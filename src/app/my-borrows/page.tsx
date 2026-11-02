import type { Metadata } from "next";
import { getMyBorrows } from "@/lib/server-api";
import { SectionHeading } from "@/components/section-heading";
import { MyBorrowsTable } from "@/components/my-borrows-table";

export const metadata: Metadata = {
  title: "My Borrows",
};

export default async function MyBorrowsPage() {
  const borrows = await getMyBorrows();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <SectionHeading
        tag="Your reading list"
        title="My Borrows"
        text="Books you have borrowed. Please return them by the date shown."
      />
      <MyBorrowsTable borrows={borrows} />
    </main>
  );
}