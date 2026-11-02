export const categories = ["Fiction", "Science", "History", "Kids", "Others"] as const;

export type Category = (typeof categories)[number];

export type Book = {
  _id: string;
  title: string;
  author: string;
  category: Category;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: {
    name: string;
    email: string;
  };
  createdAt: string;
};

type GetBooksOptions = {
  category?: string;
  limit?: number;
};

export async function getBooks({ category, limit }: GetBooksOptions = {}) {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (limit) query.set("limit", String(limit));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not load books.");
  }

  return (await response.json()) as Book[];
}