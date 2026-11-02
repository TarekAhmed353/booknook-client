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