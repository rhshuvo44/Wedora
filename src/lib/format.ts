export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? "");
}

export function pad(value: number): string {
  return String(Math.max(0, Math.floor(value))).padStart(2, "0");
}
