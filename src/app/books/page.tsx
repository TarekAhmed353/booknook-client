import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";
import { categories, getBooks, type Book } from "@/lib/books";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Books",
};

type AllBooksPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function AllBooksPage({ searchParams }: AllBooksPageProps) {
  const { category } = await searchParams;
  const activeCategory = categories.find((item) => item === category);

  let books: Book[] | null = null;
  try {
    books = await getBooks({ category: activeCategory });
  } catch {
    books = null;
  }

  const chipClass = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "bg-card text-muted-foreground hover:border-primary hover:text-primary"
    );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <SectionHeading
        tag="The whole library"
        title="All Books"
        text="Every book shared by BookNook readers, newest first."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <Link href="/books" className={chipClass(!activeCategory)}>
          All
        </Link>
        {categories.map((item) => (
          <Link
            key={item}
            href={`/books?category=${item}`}
            className={chipClass(activeCategory === item)}
          >
            {item}
          </Link>
        ))}
      </div>

      {books === null ? (
        <p className="mt-16 text-center text-destructive">
          We could not reach the library right now. Please try again in a moment.
        </p>
      ) : books.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No books on this shelf yet. Be the first to add one!
        </p>
      ) : (
        <Stagger
          key={activeCategory ?? "all"}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {books.map((book) => (
            <StaggerItem key={book._id} className="h-full">
              <BookCard book={book} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </main>
  );
}