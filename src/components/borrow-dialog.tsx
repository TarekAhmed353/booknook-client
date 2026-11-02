"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BorrowDialogProps = {
  bookId: string;
  bookTitle: string;
  available: boolean;
};

const BORROW_DAYS = 7;

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function BorrowDialog({ bookId, bookTitle, available }: BorrowDialogProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!available) {
    return (
      <Button size="lg" className="w-full sm:w-auto" disabled>
        Not Available
      </Button>
    );
  }

  const today = new Date();
  const returnBy = new Date(today.getTime() + BORROW_DAYS * 24 * 60 * 60 * 1000);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId }),
      });
      toast.success(`You borrowed "${bookTitle}". Enjoy reading!`);
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not borrow this book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto">
          Borrow This Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-primary">Borrow this book</DialogTitle>
          <DialogDescription>
            You are borrowing <span className="font-medium text-foreground">{bookTitle}</span>.
            Please check your details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrowName">Your Name</Label>
            <Input
              id="borrowName"
              value={session?.user.name ?? ""}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="borrowEmail">Your Email</Label>
            <Input
              id="borrowEmail"
              value={session?.user.email ?? ""}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4 text-sm">
            <CalendarClock className="mt-0.5 size-4 shrink-0 text-brass" />
            <p>
              Borrowed today, <span className="font-medium">{formatDate(today)}</span>. Please
              return it by <span className="font-medium">{formatDate(returnBy)}</span>.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Confirm Borrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}