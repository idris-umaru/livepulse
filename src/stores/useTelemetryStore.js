import { defineStore } from 'pinia';
import { DATASETS, MAX_EVENTS, MAX_POINTS } from '../lib/constants';
import { TelemetryStream, isStreamPayload } from '../lib/dataGenerator';
const stream = new TelemetryStream();
export const useTelemetryStore = defineStore('telemetry', {
    state: () => ({
        points: [],
        events: [],
        status: 'connecting',
        paused: false,
        error: '',
        malformedCount: 0,
        timeRange: 300,
        chartKind: 'line',
        query: '',
        severity: 'all',
        selectedDatasets: ['throughput', 'latency', 'cpu'],
        theme: (localStorage.getItem('livepulse-theme') || 'dark'),
        cleanupPayload: null,
        cleanupStatus: null
    }),
    getters: {
        datasets: () => DATASETS,
        visiblePoints(state) {
            const cutoff = Date.now() - state.timeRange * 1000;
            return state.points.filter((point) => point.timestamp >= cutoff);
        },
        selectedDatasetOptions(state) {
            return DATASETS.filter((dataset) => state.selectedDatasets.includes(dataset.id));
        },
        filteredEvents(state) {
            const query = state.query.trim().toLowerCase();
            return state.events.filter((event) => {
                const severityMatch = state.severity === 'all' || event.severity === state.severity;
                const textMatch = !query || `${event.source} ${event.message} ${event.metric}`.toLowerCase().includes(query);
                return severityMatch && textMatch;
            });
        },
        latest(state) {
            return state.points[state.points.length - 1];
        }
    },
    actions: {
        ingest(payload) {
            if (this.paused)
                return;
            if (!isStreamPayload(payload)) {
                this.malformedCount += 1;
                this.error = 'Malformed stream payload ignored';
                return;
            }
            this.points.push(payload.point);
            if (this.points.length > MAX_POINTS)
                this.points.splice(0, this.points.length - MAX_POINTS);
            if (payload.event) {
                this.events.unshift(payload.event);
                if (this.events.length > MAX_EVENTS)
                    this.events.splice(MAX_EVENTS);
            }
            this.error = '';
        },
        connect() {
            if (this.cleanupPayload || this.cleanupStatus)
                return;
            this.status = 'connecting';
            this.cleanupPayload = stream.subscribe((payload) => this.ingest(payload));
            this.cleanupStatus = stream.onStatus((connected) => {
                if (this.paused)
                    return;
                this.status = connected ? 'live' : 'reconnecting';
            });
            stream.start();
        },
        disconnect() {
            this.cleanupPayload?.();
            this.cleanupStatus?.();
            this.cleanupPayload = null;
            this.cleanupStatus = null;
            stream.stop();
            this.status = 'error';
        },
        pause() {
            this.paused = true;
            this.status = 'paused';
        },
        resume() {
            this.paused = false;
            this.status = 'live';
        },
        retry() {
            this.disconnect();
            this.status = 'connecting';
            window.setTimeout(() => this.connect(), 450);
        },
        setRange(range) {
            this.timeRange = range;
        },
        setChartKind(kind) {
            this.chartKind = kind;
        },
        toggleDataset(id) {
            if (this.selectedDatasets.includes(id)) {
                if (this.selectedDatasets.length > 1)
                    this.selectedDatasets = this.selectedDatasets.filter((item) => item !== id);
                return;
            }
            this.selectedDatasets.push(id);
        },
        setTheme(theme) {
            this.theme = theme;
            localStorage.setItem('livepulse-theme', theme);
            document.documentElement.dataset.theme = theme;
        }
    }
});
