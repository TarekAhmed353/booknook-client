"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { GoogleButton } from "@/components/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const passwordRules = [
  {
    label: "At least one uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "At least one lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "At least 6 characters",
    test: (value: string) => value.length >= 6,
  },
];

export function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordValid = passwordRules.every((rule) => rule.test(password));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const image = String(form.get("image")).trim();

    if (!passwordValid) {
      toast.error("Your password does not meet all the rules yet.");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    if (error) {
      setLoading(false);
      toast.error(error.message ?? "Registration failed. Please try again.");
      return;
    }

    await authClient.signOut();
    setLoading(false);
    toast.success("Account created. Please log in.");
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-primary">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join BookNook to add books and borrow from other readers.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your full name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Photo URL</Label>
          <Input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/your-photo.jpg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              aria-invalid={submitted && !passwordValid}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          <ul className="space-y-1 pt-1">
            {passwordRules.map((rule) => {
              const passed = rule.test(password);
              const failed = submitted && !passed;
              return (
                <li
                  key={rule.label}
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    passed && "text-green-700 dark:text-green-400",
                    failed && "text-destructive",
                    !passed && !failed && "text-muted-foreground"
                  )}
                >
                  {passed ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                  {rule.label}
                </li>
              );
            })}
          </ul>

          {submitted && !passwordValid && (
            <p className="text-sm text-destructive">
              Please fix the password rules marked in red.
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          Register
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton redirectTo="/" label="Sign up with Google" />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}