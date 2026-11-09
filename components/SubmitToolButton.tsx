import { PlusIcon } from "@/components/Icons";
import { TrackLink } from "@/components/TrackLink";

export function SubmitToolButton({
  size = "md",
  className = "",
}: {
  size?: "nav" | "md";
  className?: string;
}) {
  const sizing = size === "nav" ? "min-h-10 px-3.5 py-2 text-sm" : "min-h-12 px-5 py-3 text-base";
  return (
    <TrackLink href="/submit" goal="submit_click" className={`btn-primary focus-ring gap-2 whitespace-nowrap ${sizing} ${className}`}>
      <PlusIcon className={size === "nav" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      Submit your tool
    </TrackLink>
  );
}
