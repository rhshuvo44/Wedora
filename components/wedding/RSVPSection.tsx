"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { weddingData } from "@/data/wedding";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export interface RsvpPayload {
  name: string;
  attending: string;
  guests: number;
  message: string;
  submittedAt: string;
}

async function submitRsvp(payload: RsvpPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (process.env.NODE_ENV !== "production") {
    console.info("[rsvp] payload ready for backend:", payload);
  }
}

export function RSVPSection() {
  const { rsvp, copy, bride, groom } = weddingData;
  const fieldId = useId();
  const successRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [attending, setAttending] = useState(rsvp.attendingOptions[0]);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const isAttending = attending === rsvp.attendingOptions[0];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError(copy.rsvp.nameError);
      return;
    }
    setError(null);
    setStatus("submitting");
    await submitRsvp({
      name: name.trim(),
      attending,
      guests: isAttending ? guests : 0,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });
    setStatus("sent");
    window.requestAnimationFrame(() => successRef.current?.focus());
  };

  const reset = () => {
    setName("");
    setAttending(rsvp.attendingOptions[0]);
    setGuests(1);
    setMessage("");
    setError(null);
    setStatus("idle");
  };

  return (
    <section id="rsvp" className="relative bg-cream px-5 py-14 sm:px-6 sm:py-20">
      <div aria-hidden="true" className="sparkle-layer pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
            {copy.rsvp.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">{rsvp.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            {rsvp.description}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="lace-frame bg-cream-light px-5 py-7 text-left sm:px-8 sm:py-9">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  ref={successRef}
                  tabIndex={-1}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-center"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[50%] border border-mauve/40 text-mauve">
                    <Check className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-serif text-lg text-ink">{rsvp.successMessage}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {bride.name} &amp; {groom.name}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-5 min-h-11 rounded-full border border-mauve/50 px-6 py-2 text-[10px] font-semibold uppercase tracking-luxe text-mauve transition-colors hover:bg-mauve hover:text-cream-light"
                  >
                    {copy.rsvp.successReset}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={`${fieldId}-name`}
                      className="text-[9px] font-semibold uppercase tracking-luxe text-mauve"
                    >
                      {copy.rsvp.fields.name}
                    </label>
                    <input
                      id={`${fieldId}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${fieldId}-error` : undefined}
                      className="min-h-11 w-full border-b border-mauve/35 bg-transparent px-1 py-2 text-base text-ink outline-none transition-colors focus:border-mauve"
                    />
                    {error ? (
                      <p id={`${fieldId}-error`} role="alert" className="text-xs text-rose-deep">
                        {error}
                      </p>
                    ) : null}
                  </div>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="text-[9px] font-semibold uppercase tracking-luxe text-mauve">
                      {copy.rsvp.fields.attendance}
                    </legend>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      {rsvp.attendingOptions.map((option) => {
                        const selected = attending === option;
                        return (
                          <label
                            key={option}
                            className={cn(
                              "flex min-h-11 flex-1 cursor-pointer items-center gap-2.5 border px-4 py-2.5 text-sm transition-colors duration-300",
                              selected
                                ? "border-mauve bg-mauve text-cream-light"
                                : "border-mauve/30 text-ink-soft hover:border-mauve/60",
                            )}
                          >
                            <input
                              type="radio"
                              name="attending"
                              value={option}
                              checked={selected}
                              onChange={() => setAttending(option)}
                              className="sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-[50%] border",
                                selected ? "border-cream-light" : "border-mauve/50",
                              )}
                            >
                              {selected ? (
                                <span className="h-1.5 w-1.5 rounded-[50%] bg-cream-light" />
                              ) : null}
                            </span>
                            {option}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {isAttending ? (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-semibold uppercase tracking-luxe text-mauve">
                        {copy.rsvp.fields.guests}
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setGuests((value) => Math.max(1, value - 1))}
                          disabled={guests <= 1}
                          aria-label={`-1 ${copy.rsvp.fields.guests}`}
                          className="flex h-11 w-11 items-center justify-center rounded-[50%] border border-mauve/40 text-mauve transition-colors hover:bg-mauve hover:text-cream-light disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-mauve"
                        >
                          <Minus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-8 text-center font-serif text-2xl tabular-nums text-ink"
                        >
                          {guests}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setGuests((value) => Math.min(rsvp.maxGuests, value + 1))
                          }
                          disabled={guests >= rsvp.maxGuests}
                          aria-label={`+1 ${copy.rsvp.fields.guests}`}
                          className="flex h-11 w-11 items-center justify-center rounded-[50%] border border-mauve/40 text-mauve transition-colors hover:bg-mauve hover:text-cream-light disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-mauve"
                        >
                          <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={`${fieldId}-message`}
                      className="text-[9px] font-semibold uppercase tracking-luxe text-mauve"
                    >
                      {copy.rsvp.fields.message}
                    </label>
                    <textarea
                      id={`${fieldId}-message`}
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={copy.rsvp.fields.messagePlaceholder}
                      className="w-full resize-none border border-mauve/30 bg-cream px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-rose/80 focus:border-mauve"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="min-h-12 w-full rounded-full bg-mauve px-6 py-3 text-[10px] font-semibold uppercase tracking-luxe text-cream-light transition-colors duration-300 hover:bg-mauve-deep disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "submitting" ? copy.rsvp.submitting : rsvp.submitLabel}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
