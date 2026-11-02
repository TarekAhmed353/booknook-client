import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Banner } from "@/components/banner";
import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { HowItWorks } from "@/components/how-it-works";
import { TopCategories } from "@/components/top-categories";
import { Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { getBooks, type Book } from "@/lib/books";

export const metadata: Metadata = {
  title: {
    absolute: "BookNook | Home",
  },
};

export default async function Home() {
  let books: Book[] | null = null;
  try {
    books = await getBooks({ limit: 6 });
  } catch {
    books = null;
  }

  return (
    <main>
      <Banner />
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4">
          <SectionHeading
            tag="Fresh on the shelves"
            title="New Arrivals"
            text="The six most recent books added by our readers."
          />

          {books === null ? (
            <p className="mt-12 text-center text-destructive">
              We could not reach the library right now. Please try again in a moment.
            </p>
          ) : books.length === 0 ? (
            <p className="mt-12 text-center text-muted-foreground">
              No books yet. Add the first one!
            </p>
          ) : (
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <StaggerItem key={book._id} className="h-full">
                  <BookCard book={book} />
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/books">
                See All Books
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <HowItWorks />
      <TopCategories />
    </main>
  );
}