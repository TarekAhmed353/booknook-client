import type { Metadata } from "next";
import { Banner } from "@/components/banner";
import { SectionHeading } from "@/components/section-heading";
import { HowItWorks } from "@/components/how-it-works";
import { TopCategories } from "@/components/top-categories";

export const metadata: Metadata = {
  title: {
    absolute: "BookNook | Home",
  },
};

export default function Home() {
  return (
    <main>
      <Banner />
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4">
          <SectionHeading
            tag="Fresh on the shelves"
            title="New Arrivals"
            text="The six newest books will show up here once our server is ready."
          />
        </div>
      </section>
      <HowItWorks />
      <TopCategories />
    </main>
  );
}