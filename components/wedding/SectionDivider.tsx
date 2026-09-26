import { cn } from "@/lib/cn";

type Tone = "solid" | "soft" | "cream";

const toneClass: Record<Tone, string> = {
  solid: "bg-mauve lace-divider",
  soft: "bg-blush lace-divider--rose",
  cream: "bg-cream-light lace-divider--rose",
};

interface SectionDividerProps {
  tone?: Tone;
  className?: string;
  framed?: boolean;
}

export function SectionDivider({ tone = "solid", className, framed = false }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full",
        framed && "border-y border-mauve/25 bg-cream py-1.5",
        className,
      )}
    >
      <div className={cn("h-[26px] w-full", toneClass[tone])} />
    </div>
  );
}

export function Flourish({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-3 py-1", className)}
    >
      <span className="h-px w-10 bg-rose/70 sm:w-16" />
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-rose" fill="none">
        <path
          d="M12 2c2.2 3.4 2.2 6.6 0 10-2.2-3.4-2.2-6.6 0-10Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M12 22c-2.2-3.4-2.2-6.6 0-10 2.2 3.4 2.2 6.6 0 10Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M2.6 8.4c3.9.4 6.7 2.1 8.9 5-3.9-.4-6.7-2.1-8.9-5Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M21.4 15.6c-3.9-.4-6.7-2.1-8.9-5 3.9.4 6.7 2.1 8.9 5Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
      <span className="h-px w-10 bg-rose/70 sm:w-16" />
    </div>
  );
}
