import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-primary">Register</h1>
      <p className="mt-3 text-muted-foreground">
        The registration form will go here.
      </p>
    </main>
  );
}