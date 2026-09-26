"use client";

import { weddingData } from "@/data/wedding";

const DAY = 24;
const MONTH = 9;
const YEAR = 2025;
const START_HOUR = 16;
const START_MINUTE = 0;
const END_HOUR = 23;
const END_MINUTE = 30;
const TZID = "America/New_York";

const pad = (n: number) => String(n).padStart(2, "0");

const localStamp = (day: number, hour: number, minute: number) =>
  `${YEAR}${pad(MONTH + 1)}${pad(day)}T${pad(hour)}${pad(minute)}00`;

const escapeText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

function buildGoogleUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${weddingData.cover.brideNick} & ${weddingData.cover.groomNick} — ${weddingData.cover.invitationType}`,
    dates: `${localStamp(DAY, START_HOUR, START_MINUTE)}/${localStamp(DAY, END_HOUR, END_MINUTE)}`,
    details: `${weddingData.cover.invitationType} at ${weddingData.details.venue.value}, ${weddingData.venue.address}`,
    location: weddingData.venue.address,
    ctz: TZID,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcs(): string {
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding-invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${YEAR}${pad(MONTH + 1)}${pad(DAY)}-nikkah@wedora`,
    `DTSTAMP:${YEAR}${pad(MONTH + 1)}${pad(DAY)}T120000Z`,
    `DTSTART;TZID=${TZID}:${localStamp(DAY, START_HOUR, START_MINUTE)}`,
    `DTEND;TZID=${TZID}:${localStamp(DAY, END_HOUR, END_MINUTE)}`,
    `SUMMARY:${escapeText(`${weddingData.cover.brideNick} & ${weddingData.cover.groomNick} — ${weddingData.cover.invitationType}`)}`,
    `LOCATION:${escapeText(weddingData.venue.address)}`,
    `DESCRIPTION:${escapeText(`${weddingData.cover.invitationType} at ${weddingData.details.venue.value}, ${weddingData.venue.address}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export default function CalendarSection() {
  const { calendar } = weddingData;

  return (
    <button
      type="button"
      className="jm-outline-cta"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("jm:open", { detail: "calendar" }));
      }}
    >
      {calendar.buttonLabel}
    </button>
  );
}

export { buildGoogleUrl, buildIcs };
