"use client";

import { CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-24 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-accent text-primary">
        <CloudOff className="size-10" />
      </span>
      <h1 className="mt-8 text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We could not load this page. The library server may be waking up. Please try again.
      </p>
      <Button size="lg" className="mt-8" onClick={reset}>
        Try Again
      </Button>
    </main>
  );
}