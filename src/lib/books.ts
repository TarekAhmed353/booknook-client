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

export type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  userName: string;
  borrowDate: string;
  returnDate: string;
};

export function copiesText(available: number, total: number) {
  return `${available} of ${total} ${total === 1 ? "copy" : "copies"} available`;
}

export function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type GetBooksOptions = {
  category?: string;
  limit?: number;
  email?: string;
};

export async function getBooks({ category, limit, email }: GetBooksOptions = {}) {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (limit) query.set("limit", String(limit));
  if (email) query.set("email", email);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not load books.");
  }

  return (await response.json()) as Book[];
}