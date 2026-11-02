import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";
import { cn } from "@/lib/utils";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const available = book.availableCopies > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-80 bg-secondary/60">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-14 text-xl leading-7 font-semibold">{book.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>
        <p
          className={cn(
            "mt-3 text-xs font-medium",
            available ? "text-green-700 dark:text-green-400" : "text-destructive"
          )}
        >
          {available
            ? `${book.availableCopies} of ${book.totalCopies} copies available`
            : "Not Available"}
        </p>
        <Button asChild className="mt-5 w-full">
          <Link href={`/books/${book._id}`}>View Details</Link>
        </Button>
      </div>
    </article>
  );
}