import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

type LoginPageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect: redirectParam } = await searchParams;

  const redirectTo =
    redirectParam && redirectParam.startsWith("/") && !redirectParam.startsWith("//")
      ? redirectParam
      : "/";

  return (
    <main className="mx-auto flex w-full max-w-7xl justify-center px-4 py-16">
      <LoginForm redirectTo={redirectTo} />
    </main>
  );
}