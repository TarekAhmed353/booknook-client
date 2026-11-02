import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-primary">Login</h1>
      <p className="mt-3 text-muted-foreground">
        The login form will go here.
      </p>
    </main>
  );
}