import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "BookNook | Home",
  },
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-primary">Home</h1>
      <p className="mt-3 text-muted-foreground">
        The banner slider and the newest books will go here.
      </p>
    </main>
  );
}