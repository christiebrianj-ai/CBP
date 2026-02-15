const submissions = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );
  if (timestamps.length >= MAX_PER_WINDOW) return false;
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return true;
}
