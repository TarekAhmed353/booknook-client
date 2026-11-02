import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Book, Borrow } from "@/lib/books";

async function getServerToken(redirectPath: string) {
  try {
    const result = await auth.api.getToken({ headers: await headers() });
    return result.token;
  } catch {
    redirect(`/login?redirect=${redirectPath}`);
  }
}

export const getBookById = cache(async (id: string) => {
  const token = await getServerToken(`/books/${id}`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Could not load this book.");
  }

  return (await response.json()) as Book;
});

export async function getMyBorrows() {
  const token = await getServerToken("/my-borrows");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not load your borrows.");
  }

  return (await response.json()) as Borrow[];
}