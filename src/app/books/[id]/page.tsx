import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookCopy, CalendarDays, UserRound } from "lucide-react";
import { getBookById } from "@/lib/server-api";
import { BorrowDialog } from "@/components/borrow-dialog";
import { cn } from "@/lib/utils";

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);
  return { title: book ? book.title : "Book Not Found" };
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  const available = book.availableCopies > 0;
  const addedOn = new Date(book.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12">
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to All Books
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div className="rounded-3xl bg-secondary/60 p-8 sm:p-12">
          <div className="relative mx-auto aspect-2/3 w-full max-w-sm">
            <Image
              src={book.image}
              alt={book.title}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
            {book.category}
          </span>
          <h1 className="mt-4 text-4xl leading-tight font-semibold text-primary md:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">by {book.author}</p>

          <p className="mt-8 text-base leading-relaxed">{book.description}</p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-4">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookCopy className="size-4 text-brass" />
                Copies
              </dt>
              <dd
                className={cn(
                  "mt-1 text-sm font-semibold",
                  available ? "text-green-700 dark:text-green-400" : "text-destructive"
                )}
              >
                {available
                  ? `${book.availableCopies} of ${book.totalCopies} available`
                  : "Not Available"}
              </dd>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <UserRound className="size-4 text-brass" />
                Added by
              </dt>
              <dd className="mt-1 truncate text-sm font-semibold">{book.addedBy.name}</dd>
              <dd className="truncate text-xs text-muted-foreground">{book.addedBy.email}</dd>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="size-4 text-brass" />
                Added on
              </dt>
              <dd className="mt-1 text-sm font-semibold">{addedOn}</dd>
            </div>
          </dl>

          <div className="mt-10">
            <BorrowDialog bookId={book._id} bookTitle={book.title} available={available} />
          </div>
        </div>
      </div>
    </main>
  );
}