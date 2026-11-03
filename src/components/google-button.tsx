"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type GoogleButtonProps = {
  redirectTo: string;
  label: string;
};

export function GoogleButton({ redirectTo, label }: GoogleButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
      errorCallbackURL: "/login",
    });

    if (error) {
      setLoading(false);
      toast.error(error.message ?? "Google login failed. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="w-full"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : <FcGoogle />}
      {label}
    </Button>
  );
}