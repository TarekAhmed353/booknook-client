import Link from "next/link";
import {
  ArrowRight,
  BookHeart,
  FlaskConical,
  Landmark,
  Library,
  ToyBrick,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";

const categories = [
  {
    name: "Fiction",
    icon: BookHeart,
    text: "Novels and short stories to get lost in.",
  },
  {
    name: "Science",
    icon: FlaskConical,
    text: "How the world works, from atoms to galaxies.",
  },
  {
    name: "History",
    icon: Landmark,
    text: "The people and events that shaped today.",
  },
  {
    name: "Kids",
    icon: ToyBrick,
    text: "Picture books and first chapter books.",
  },
  {
    name: "Others",
    icon: Library,
    text: "Cookbooks, poetry, self-help and more.",
  },
];

export function TopCategories() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeading
          tag="Top categories"
          title="Browse by category"
          text="Every book on BookNook sits on one of these five shelves."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <StaggerItem key={category.name} className="h-full">
              <Link
                href={`/books?category=${category.name}`}
                className="group flex h-full flex-col items-center rounded-2xl border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <span className="grid size-14 place-items-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <category.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  {category.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Browse
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}