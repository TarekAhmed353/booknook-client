import { BookOpen } from "lucide-react";

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
        <BookOpen className="size-5" />
      </span>
      <span className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        Book<span className="text-primary">Nook</span>
      </span>
    </span>
  );
}