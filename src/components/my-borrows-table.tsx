"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { formatDate, type Borrow } from "@/lib/books";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MyBorrowsTableProps = {
  borrows: Borrow[];
};

export function MyBorrowsTable({ borrows }: MyBorrowsTableProps) {
  const router = useRouter();
  const [returningId, setReturningId] = useState<string | null>(null);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    try {
      await apiFetch(`/borrows/${borrow._id}`, { method: "DELETE" });
      toast.success(`"${borrow.bookTitle}" returned. Thank you!`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not return this book.");
    } finally {
      setReturningId(null);
    }
  };

  if (borrows.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-2xl border bg-card px-6 py-16 text-center shadow-sm">
        <span className="grid size-16 place-items-center rounded-full bg-accent text-primary">
          <BookOpen className="size-8" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">No borrowed books yet</h2>
        <p className="mt-2 max-w-sm text-muted-foreground">
          When you borrow a book it will show up here, along with the date to return it.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/books">Browse Books</Link>
        </Button>
      </div>
    );
  }

  const now = Date.now();

  return (
    <div className="mt-10 rounded-2xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 pl-6">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead className="pr-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows.map((borrow) => {
            const overdue = new Date(borrow.returnDate).getTime() < now;
            const returning = returningId === borrow._id;

            return (
              <TableRow key={borrow._id}>
                <TableCell className="pl-6">
                  <div className="relative h-20 w-14 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={borrow.bookImage}
                      alt={borrow.bookTitle}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/books/${borrow.bookId}`} className="hover:text-primary">
                    {borrow.bookTitle}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(borrow.borrowDate)}
                </TableCell>
                <TableCell>
                  <span className={overdue ? "font-medium text-destructive" : ""}>
                    {formatDate(borrow.returnDate)}
                  </span>
                  {overdue && (
                    <span className="ml-2 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      Overdue
                    </span>
                  )}
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReturn(borrow)}
                    disabled={returningId !== null}
                  >
                    {returning && <Loader2 className="animate-spin" />}
                    {returning ? "Returning..." : "Return Book"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}