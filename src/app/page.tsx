import type { Metadata } from "next";
import { Banner } from "@/components/banner";

export const metadata: Metadata = {
  title: {
    absolute: "BookNook | Home",
  },
};

export default function Home() {
  return (
    <main>
      <Banner />
      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold text-primary md:text-4xl">
          New Arrivals
        </h2>
        <p className="mt-3 text-muted-foreground">
          The six newest books will show up here once our server is ready.
        </p>
      </section>
    </main>
  );
}