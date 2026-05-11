# LivePulse

LivePulse is a Vue 3 + TypeScript real-time visualization platform for streaming operational telemetry. It simulates a production monitoring console with live metrics, canvas-rendered charts, activity filtering, pause/resume controls, reconnect states, malformed payload handling, and responsive dark/light UI.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Architecture

- `src/views/` contains routed screens: dashboard, analytics, and settings.
- `src/components/common/` contains reusable UI primitives.
- `src/components/charts/` contains line, area, bar, and real-time chart components. They share a canvas renderer for high-frequency updates.
- `src/components/layout/` contains the shell, header, top navigation, and sidebar.
- `src/components/widgets/` contains dashboard-specific widgets such as filters, dataset toggles, and the activity feed.
- `src/composables/` exposes Composition API helpers for stream status, metrics, data, and chart configuration.
- `src/stores/useTelemetryStore.ts` is the Pinia state layer. It validates payloads, bounds retained history, filters visible time ranges, exposes selected datasets, and cleans up subscriptions.
- `src/lib/dataGenerator.ts` re-exports the mocked streaming transport, backed by `src/services/stream.ts`.

## State Management Strategy

The app uses Pinia as the centralized dashboard store. The store exposes explicit actions for stream connection, pause/resume, range changes, chart mode, dataset toggles, and theme selection. Derived data such as visible time-window points, selected dataset metadata, and filtered activity logs live in getters so components stay lean.

## Rendering Optimization Decisions

- Charts render with Canvas instead of DOM/SVG nodes, which keeps updates smooth as sample counts grow.
- Chart redraws are scheduled with `requestAnimationFrame`.
- Incoming history is bounded to `MAX_POINTS`, and events are bounded to `MAX_EVENTS`.
- The chart downsamples very large visible windows before drawing.
- Computed selectors derive visible time-window data and filtered activity without duplicating state.
- Stream listeners and resize observers are cleaned up on unmount.

## Data Streaming Approach

The platform uses a mocked streaming generator shaped like a WebSocket/SSE client. It emits a payload every 450ms, includes realistic metric drift and spikes, and can be paused without page refresh. It also simulates reconnect windows and malformed payloads so the dashboard can demonstrate resilience.

## Security and Stability

- Incoming payloads are validated before entering state.
- No unsafe HTML injection is used.
- Malformed records are rejected and counted.
- Dataset history and activity logs are capped to prevent memory leaks.
- Subscriptions, intervals, animation frames, and resize observers are cleaned up.

## Trade-offs

The dashboard uses a mocked stream to keep the submission self-contained and easy to run. A real WebSocket or SSE adapter can replace `TelemetryStream` without changing the dashboard components. Canvas charts trade some built-in chart-library affordances for stronger control over rendering performance and lower runtime overhead.
