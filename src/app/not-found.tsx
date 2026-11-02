import type { Metadata } from "next";
import Link from "next/link";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-24 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-accent text-primary">
        <BookX className="size-10" />
      </span>
      <p className="mt-8 font-heading text-7xl font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl font-semibold">This page is not on our shelves</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page or book you are looking for may have been moved, returned, or never existed.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}