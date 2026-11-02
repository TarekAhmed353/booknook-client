import { Button } from "@/components/ui/button";

function Preview() {
  return (
    <div className="rounded-2xl border bg-background p-8 text-foreground">
      <p className="text-sm font-semibold uppercase tracking-widest text-brass">
        Welcome to
      </p>
      <h1 className="mt-2 text-5xl font-semibold text-primary">BookNook</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Add a book, borrow a book, return a book. A small library run by its readers.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg">Browse Books</Button>
        <Button size="lg" variant="outline">
          Add a Book
        </Button>
        <Button size="lg" variant="secondary">
          How It Works
        </Button>
      </div>
      <div className="mt-8 rounded-xl border bg-card p-5 text-card-foreground">
        <h3 className="text-xl font-semibold">The Night Library</h3>
        <p className="mt-1 text-sm text-muted-foreground">Matt Haig · Fiction</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 lg:grid-cols-2">
      <Preview />
      <div className="dark">
        <Preview />
      </div>
    </main>
  );
}