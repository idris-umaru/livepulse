export type Severity = 'info' | 'warning' | 'critical';
export type StreamStatus = 'connecting' | 'live' | 'paused' | 'reconnecting' | 'error';
export type TimeRange = 60 | 300 | 900 | 3600;
export type ChartKind = 'line' | 'area' | 'bar';

export interface TelemetryPoint {
  timestamp: number;
  throughput: number;
  latency: number;
  errorRate: number;
  cpu: number;
  memory: number;
  attacks: number;
}

export interface ActivityEvent {
  id: string;
  timestamp: number;
  source: string;
  severity: Severity;
  message: string;
  metric: keyof Omit<TelemetryPoint, 'timestamp'>;
  value: number;
}

export interface StreamPayload {
  point: TelemetryPoint;
  event?: ActivityEvent;
}

export interface DatasetOption {
  id: keyof Omit<TelemetryPoint, 'timestamp'>;
  label: string;
  color: string;
  unit: string;
}
