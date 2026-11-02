import Image from "next/image";
import Link from "next/link";
import { copiesText, formatDate, type Book } from "@/lib/books";
import { EditBookDialog } from "@/components/edit-book-dialog";
import { DeleteBookDialog } from "@/components/delete-book-dialog";

type MyBookCardProps = {
  book: Book;
};

export function MyBookCard({ book }: MyBookCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
      <Link href={`/books/${book._id}`} className="relative block h-64 bg-secondary/60">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-5 drop-shadow-xl"
        />
        <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          {book.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-14 text-xl leading-7 font-semibold">{book.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{copiesText(book.availableCopies, book.totalCopies)}</span>
          <span>Added {formatDate(book.createdAt)}</span>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <EditBookDialog book={book} />
          <DeleteBookDialog bookId={book._id} bookTitle={book.title} />
        </div>
      </div>
    </article>
  );
}