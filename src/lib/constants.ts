import type { DatasetOption } from '../types';

export const MAX_POINTS = Number(import.meta.env.VITE_MAX_POINTS ?? 4800);
export const MAX_EVENTS = 500;

export const DATASETS: DatasetOption[] = [
  { id: 'throughput', label: 'Throughput', color: '#38bdf8', unit: 'req/s' },
  { id: 'latency', label: 'Latency', color: '#f59e0b', unit: 'ms' },
  { id: 'errorRate', label: 'Error rate', color: '#fb7185', unit: '%' },
  { id: 'cpu', label: 'CPU', color: '#22c55e', unit: '%' },
  { id: 'memory', label: 'Memory', color: '#a78bfa', unit: '%' },
  { id: 'attacks', label: 'Threats', color: '#f43f5e', unit: '/min' }
];
