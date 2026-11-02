import { BookCheck, Search, Undo2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";

const steps = [
  {
    icon: Search,
    title: "Find a book",
    text: "Look through the shelves on All Books and open any title to see its details.",
  },
  {
    icon: BookCheck,
    title: "Borrow it",
    text: "Press Borrow This Book and confirm. The book is yours for the next 7 days.",
  },
  {
    icon: Undo2,
    title: "Return it",
    text: "Finished reading? Open My Borrows and press Return Book so the next reader can have it.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeading
          tag="How borrowing works"
          title="Three steps, no library card"
          text="Borrowing from BookNook takes less than a minute."
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem
              key={step.title}
              className="relative flex h-full flex-col rounded-2xl border bg-card p-8 shadow-sm"
            >
              <span className="absolute top-6 right-6 font-heading text-5xl font-semibold text-primary/10">
                0{index + 1}
              </span>
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}