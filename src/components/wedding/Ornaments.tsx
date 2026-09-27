export type OrnamentVariant = "flower" | "diamond" | "dots";

function FlowerMark() {
  return (
    <svg className="jm-orn__mark" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" transform="translate(12 12)">
        <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.4" />
        <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.4" transform="rotate(90)" />
        <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.4" transform="rotate(180)" />
        <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.4" transform="rotate(270)" />
        <circle r="1.1" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function DiamondMark() {
  return (
    <svg className="jm-orn__mark" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" transform="translate(12 12)">
        <path d="M0-7 4.2 0 0 7-4.2 0Z" />
        <path d="M0-2.8 1.6 0 0 2.8-1.6 0Z" fill="currentColor" stroke="none" opacity="0.5" />
      </g>
    </svg>
  );
}

function DotsMark() {
  return (
    <svg className="jm-orn__mark" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <g fill="currentColor" transform="translate(12 12)">
        <circle cx="-6.5" r="1" opacity="0.45" />
        <circle r="1.6" opacity="0.8" />
        <circle cx="6.5" r="1" opacity="0.45" />
      </g>
    </svg>
  );
}

const MARKS: Record<OrnamentVariant, () => React.JSX.Element> = {
  flower: FlowerMark,
  diamond: DiamondMark,
  dots: DotsMark,
};

/**
 * Hairline · mark · hairline. The rhythm that separates every section.
 */
export function Divider({
  variant = "flower",
  tight = false,
  wide = false,
}: {
  variant?: OrnamentVariant;
  tight?: boolean;
  wide?: boolean;
}) {
  const Mark = MARKS[variant];
  const classes = ["jm-orn"];
  if (tight) classes.push("jm-orn--tight");
  if (wide) classes.push("jm-orn--wide");

  return (
    <div className={classes.join(" ")} aria-hidden="true">
      <span className="jm-orn__rule" />
      <Mark />
      <span className="jm-orn__rule jm-orn__rule--flip" />
    </div>
  );
}

/**
 * The tall double oval the cover is printed inside: a hairline outer rule,
 * a fine dotted ornament, then a second hairline just inside it. The frame
 * stretches to whatever the cover measures, while non-scaling strokes keep
 * every rule the same weight at any size.
 */
export function OvalFrame() {
  return (
    <div className="jm-oval-frame" aria-hidden="true">
      <svg className="jm-oval" viewBox="0 0 300 620" preserveAspectRatio="none" focusable="false">
        <ellipse
          cx="150"
          cy="310"
          rx="149"
          ry="309"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
        <ellipse
          cx="150"
          cy="310"
          rx="141"
          ry="301"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeDasharray="0.8 4.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <ellipse
          cx="150"
          cy="310"
          rx="133"
          ry="293"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          opacity="0.38"
        />
      </svg>
    </div>
  );
}

/** Closing sprig at the foot of the card. */
export function SprigMark() {
  return (
    <svg className="jm-closing__mark" viewBox="0 0 34 34" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M17 31C17 24.5 17 18.5 17 12.5" />
        <path d="M17 25.5C12.5 24.5 9.5 21.5 8.5 17.5" />
        <path d="M17 21C13 20 10.5 17.5 10 14" />
        <path d="M17 25.5C21.5 24.5 24.5 21.5 25.5 17.5" />
        <path d="M17 21C21 20 23.5 17.5 24 14" />
        <path d="M17 12.5C14.4 9.6 14.4 5.4 17 3C19.6 5.4 19.6 9.6 17 12.5Z" />
      </g>
      <g fill="currentColor">
        <circle cx="6.5" cy="14.5" r="0.9" />
        <circle cx="27.5" cy="14.5" r="0.9" />
        <circle cx="17" cy="31" r="1" />
      </g>
    </svg>
  );
}
