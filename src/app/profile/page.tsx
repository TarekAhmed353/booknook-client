import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, Mail } from "lucide-react";
import { auth } from "@/lib/auth";
import { getInitials } from "@/lib/initials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?redirect=/profile");
  }

  const { user } = session;
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto flex w-full max-w-7xl justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <Avatar className="mx-auto size-24 ring-4 ring-accent">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-5 text-3xl font-semibold text-primary">{user.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">BookNook reader</p>

        <dl className="mt-8 space-y-3 text-left">
          <div className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3">
            <Mail className="size-4 text-brass" />
            <div>
              <dt className="text-xs text-muted-foreground">Email</dt>
              <dd className="text-sm font-medium">{user.email}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3">
            <CalendarDays className="size-4 text-brass" />
            <div>
              <dt className="text-xs text-muted-foreground">Member since</dt>
              <dd className="text-sm font-medium">{memberSince}</dd>
            </div>
          </div>
        </dl>
      </div>
    </main>
  );
}