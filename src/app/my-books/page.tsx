import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Library } from "lucide-react";
import { auth } from "@/lib/auth";
import { getBooks } from "@/lib/books";
import { SectionHeading } from "@/components/section-heading";
import { MyBookCard } from "@/components/my-book-card";
import { Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Books",
};

export default async function MyBooksPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?redirect=/my-books");
  }

  const books = await getBooks({ email: session.user.email });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <SectionHeading
        tag="Your shelf"
        title="My Books"
        text="Books you have shared with BookNook. Edit the details or remove a book here."
      />

      {books.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border bg-card px-6 py-16 text-center shadow-sm">
          <span className="grid size-16 place-items-center rounded-full bg-accent text-primary">
            <Library className="size-8" />
          </span>
          <h2 className="mt-6 text-2xl font-semibold">You have not added any books yet</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Share a book from your own shelf so other readers can borrow it.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/add-book">Add Your First Book</Link>
          </Button>
        </div>
      ) : (
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <StaggerItem key={book._id} className="h-full">
              <MyBookCard book={book} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </main>
  );
}