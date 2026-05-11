export function formatMetric(value, maximumFractionDigits = 1) {
    return value.toLocaleString(undefined, { maximumFractionDigits });
}
export function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString();
}
