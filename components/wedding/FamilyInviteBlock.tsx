import { BISMILLAH, type EventParents } from "@/data/wedding";
import { cn } from "@/lib/cn";
import { Flourish } from "./SectionDivider";

interface FamilyInviteBlockProps {
  parents: EventParents;
  bismillah?: boolean;
  bismillahText?: string;
  gratitudeLine?: string;
  className?: string;
  compact?: boolean;
}

export function FamilyInviteBlock({
  parents,
  bismillah = true,
  bismillahText = BISMILLAH,
  gratitudeLine,
  className,
  compact = false,
}: FamilyInviteBlockProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {bismillah ? (
        <>
          <p
            lang="ar"
            dir="rtl"
            className={cn(
              "arabic text-ink",
              compact ? "text-xl leading-loose sm:text-2xl" : "text-2xl leading-loose sm:text-3xl",
            )}
          >
            {bismillahText}
          </p>
          {gratitudeLine ? (
            <p className="mt-1.5 max-w-[22rem] text-[10px] font-medium uppercase leading-relaxed tracking-luxe text-mauve sm:text-[11px]">
              {gratitudeLine}
            </p>
          ) : null}
          <Flourish className="mt-2" />
        </>
      ) : null}

      <div className={cn("flex flex-col items-center", compact ? "mt-3" : "mt-4")}>
        <NameList names={parents.sideA} />
        <p
          className={cn(
            "font-serif text-rose-deep italic",
            compact ? "my-1.5 text-sm" : "my-2 text-base",
          )}
        >
          {parents.joiner}
        </p>
        <NameList names={parents.sideB} />
      </div>
    </div>
  );
}

function NameList({ names }: { names: string[] }) {
  return (
    <ul className="flex flex-col items-center gap-0.5">
      {names.map((name) => (
        <li
          key={name}
          className="font-serif text-lg leading-snug font-medium text-ink sm:text-xl"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
