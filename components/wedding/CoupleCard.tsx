import type { Person } from "@/data/wedding";
import { Reveal } from "./Reveal";

interface CoupleCardProps {
  roleLabel: string;
  person: Person;
  parents: string[];
  delay?: number;
}

export function CoupleCard({ roleLabel, person, parents, delay = 0 }: CoupleCardProps) {
  return (
    <Reveal delay={delay} className="flex-1">
      <article className="lace-frame flex h-full flex-col items-center bg-cream-light px-5 py-8 text-center">
        <p className="text-[9px] font-semibold uppercase tracking-luxe text-rose-deep sm:text-[10px]">
          {roleLabel}
        </p>

        <div
          aria-hidden="true"
          className="mt-4 flex h-20 w-16 items-center justify-center rounded-[50%] border border-rose/70 bg-cream"
        >
          <span className="script-name text-4xl text-mauve">{person.name.charAt(0)}</span>
        </div>

        <h3 className="script-name mt-4 text-3xl text-ink sm:text-4xl">{person.name}</h3>
        <p className="mt-1 font-serif text-sm text-ink-soft sm:text-base">{person.fullName}</p>

        <div aria-hidden="true" className="dotted-rule my-4 h-[2px] w-20" />

        {person.title ? (
          <p className="text-[9px] font-medium uppercase tracking-soft text-mauve sm:text-[10px]">
            {person.title}
          </p>
        ) : null}
        <ul className="mt-1 flex flex-col gap-0.5">
          {parents.map((name) => (
            <li key={name} className="font-serif text-sm leading-snug text-ink-soft sm:text-[15px]">
              {name}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
