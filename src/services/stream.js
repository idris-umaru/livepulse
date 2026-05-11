const sources = ['edge-gateway-01', 'cluster-api-east', 'fraud-detector', 'iot-hub-7', 'cdn-pop-lagos'];
const messages = {
    info: ['Traffic normalized', 'New telemetry batch accepted', 'Cache hit ratio improved'],
    warning: ['Latency deviation detected', 'Memory pressure rising', 'Packet loss above baseline'],
    critical: ['Suspicious burst blocked', 'Error budget burn accelerated', 'Service health degraded']
};
export class TelemetryStream {
    timerId = null;
    listeners = new Set();
    statusListeners = new Set();
    sequence = 0;
    connected = false;
    lastPoint = {
        timestamp: Date.now(),
        throughput: 1080,
        latency: 74,
        errorRate: 1.7,
        cpu: 45,
        memory: 58,
        attacks: 11
    };
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
    onStatus(listener) {
        this.statusListeners.add(listener);
        return () => this.statusListeners.delete(listener);
    }
    start() {
        if (this.timerId)
            return;
        this.connected = true;
        this.emitStatus();
        this.timerId = window.setInterval(() => this.tick(), 450);
    }
    stop() {
        if (this.timerId) {
            window.clearInterval(this.timerId);
            this.timerId = null;
        }
        this.connected = false;
        this.emitStatus();
    }
    tick() {
        this.sequence += 1;
        if (this.sequence % 73 === 0) {
            this.listeners.forEach((listener) => listener({ broken: true, timestamp: 'invalid' }));
            return;
        }
        if (this.sequence % 97 === 0) {
            this.connected = false;
            this.emitStatus();
            window.setTimeout(() => {
                this.connected = true;
                this.emitStatus();
            }, 1600);
            return;
        }
        const point = this.nextPoint();
        const payload = {
            point,
            event: this.sequence % 2 === 0 ? this.nextEvent(point) : undefined
        };
        this.listeners.forEach((listener) => listener(payload));
    }
    nextPoint() {
        const wave = Math.sin(this.sequence / 9);
        const spike = Math.random() > 0.93 ? 1.55 : 1;
        const drift = (value, delta, min, max) => {
            const next = value + delta + (Math.random() - 0.5) * delta * 2;
            return Math.max(min, Math.min(max, next));
        };
        this.lastPoint = {
            timestamp: Date.now(),
            throughput: Math.round(drift(this.lastPoint.throughput, 42 * spike + wave * 16, 420, 2800)),
            latency: Number(drift(this.lastPoint.latency, 7 * spike - wave * 3, 24, 260).toFixed(1)),
            errorRate: Number(drift(this.lastPoint.errorRate, 0.22 * spike, 0.1, 9.9).toFixed(2)),
            cpu: Number(drift(this.lastPoint.cpu, 3.4 + wave, 12, 99).toFixed(1)),
            memory: Number(drift(this.lastPoint.memory, 2.2 - wave, 18, 98).toFixed(1)),
            attacks: Math.round(drift(this.lastPoint.attacks, 4 * spike, 0, 120))
        };
        return this.lastPoint;
    }
    nextEvent(point) {
        const severity = point.errorRate > 6 || point.attacks > 80 ? 'critical' : point.latency > 150 ? 'warning' : 'info';
        const metric = point.attacks > 65 ? 'attacks' : point.latency > 120 ? 'latency' : point.cpu > 75 ? 'cpu' : 'throughput';
        const options = messages[severity];
        return {
            id: `${Date.now()}-${this.sequence}`,
            timestamp: point.timestamp,
            source: sources[this.sequence % sources.length],
            severity,
            message: options[Math.floor(Math.random() * options.length)],
            metric,
            value: point[metric]
        };
    }
    emitStatus() {
        this.statusListeners.forEach((listener) => listener(this.connected));
    }
}
export function isStreamPayload(value) {
    if (!value || typeof value !== 'object')
        return false;
    const payload = value;
    const point = payload.point;
    if (!point || typeof point !== 'object')
        return false;
    const numericKeys = ['timestamp', 'throughput', 'latency', 'errorRate', 'cpu', 'memory', 'attacks'];
    return numericKeys.every((key) => Number.isFinite(point[key]));
}
