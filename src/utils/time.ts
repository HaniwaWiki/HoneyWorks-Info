export function formatSeconds(seconds: number, format: 'mm:ss' | 'HH:mm:ss' = 'mm:ss'): string {
  const date = new Date(0);
  date.setSeconds(seconds); // specify value for SECONDS here
  const start = format === 'mm:ss' ? 14 : 11;
  const end = 19;
  return date.toISOString().substring(start, end);
}

export default function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
