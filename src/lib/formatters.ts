export function formatMetric(value: number, maximumFractionDigits = 1) {
  return value.toLocaleString(undefined, { maximumFractionDigits });
}

export function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString();
}
