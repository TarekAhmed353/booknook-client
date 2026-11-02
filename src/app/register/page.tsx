import type { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl justify-center px-4 py-16">
      <RegisterForm />
    </main>
  );
}