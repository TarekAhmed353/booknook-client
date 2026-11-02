import { Loader2 } from "lucide-react";

type SpinnerProps = {
  label?: string;
};

export function Spinner({ label = "Loading..." }: SpinnerProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="size-10 animate-spin text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}