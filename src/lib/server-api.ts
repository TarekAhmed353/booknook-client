import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Book } from "@/lib/books";

export const getBookById = cache(async (id: string) => {
  let token: string;

  try {
    const result = await auth.api.getToken({ headers: await headers() });
    token = result.token;
  } catch {
    redirect(`/login?redirect=/books/${id}`);
  }

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