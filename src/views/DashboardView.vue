<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
import ActivityFeed from '../components/widgets/ActivityFeed.vue';
import AreaChart from '../components/charts/AreaChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import DatasetToggles from '../components/widgets/DatasetToggles.vue';
import MetricCard from '../components/common/MetricCard.vue';
import QuickFilters from '../components/widgets/QuickFilters.vue';
import RealTimeChart from '../components/charts/RealTimeChart.vue';
import { formatMetric } from '../lib/formatters';
import { useTelemetryStore } from '../stores/useTelemetryStore';
import type { TelemetryPoint } from '../types';

const store = useTelemetryStore();

const metricCards = computed(() => {
  const points = store.visiblePoints;
  const latest = points[points.length - 1];
  const previous = points[Math.max(0, points.length - 8)];
  if (!latest) return [];

  const card = (label: string, key: keyof TelemetryPoint, unit: string, inverse = false) => {
    const value = Number(latest[key]);
    const old = Number(previous?.[key] ?? value);
    const delta = old === 0 ? 0 : ((value - old) / old) * 100;
    const good = inverse ? delta < 0 : delta > 0;
    const tone: 'good' | 'warn' | 'bad' | 'neutral' = Math.abs(delta) < 1 ? 'neutral' : good ? 'good' : delta > 12 ? 'bad' : 'warn';
    return {
      label,
      value: formatMetric(value, key === 'errorRate' ? 2 : 1),
      unit,
      delta: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`,
      tone
    };
  };

  return [
    card('Throughput', 'throughput', 'req/s'),
    card('Latency', 'latency', 'ms', true),
    card('Error Rate', 'errorRate', '%', true),
    card('CPU Load', 'cpu', '%', true)
  ];
});

const barDatasets = computed(() => store.datasets.filter((dataset) => ['attacks', 'errorRate', 'memory'].includes(dataset.id)));
const areaDatasets = computed(() => store.datasets.filter((dataset) => ['cpu', 'memory'].includes(dataset.id)));

onMounted(() => {
  document.documentElement.dataset.theme = store.theme;
  store.connect();
});

onBeforeUnmount(store.disconnect);

watch(
  () => store.theme,
  (theme) => {
    document.documentElement.dataset.theme = theme;
  },
  { immediate: true }
);
</script>

<template>
  <QuickFilters
    :paused="store.paused"
    :status="store.status"
    :time-range="store.timeRange"
    :chart-kind="store.chartKind"
    :theme="store.theme"
    @pause="store.pause"
    @resume="store.resume"
    @retry="store.retry"
    @range="store.setRange"
    @chart="store.setChartKind"
    @theme="store.setTheme"
  />

  <div v-if="store.error" class="notice">
    {{ store.error }} · {{ store.malformedCount }} rejected payloads
  </div>

  <section class="metrics-grid">
    <MetricCard
      v-for="metric in metricCards"
      :key="metric.label"
      :label="metric.label"
      :value="metric.value"
      :unit="metric.unit"
      :delta="metric.delta"
      :tone="metric.tone"
    />
  </section>

  <section class="dashboard-grid">
    <div class="main-column">
      <RealTimeChart
        title="Streaming Performance"
        :points="store.visiblePoints"
        :datasets="store.selectedDatasetOptions"
        :kind="store.chartKind"
      />
      <div class="split-grid">
        <AreaChart title="Resource Saturation" :points="store.visiblePoints" :datasets="areaDatasets" />
        <BarChart title="Risk Distribution" :points="store.visiblePoints" :datasets="barDatasets" />
      </div>
    </div>

    <aside class="side-column">
      <DatasetToggles :datasets="store.datasets" :selected="store.selectedDatasets" @toggle="store.toggleDataset" />
      <ActivityFeed
        :events="store.filteredEvents"
        :query="store.query"
        :severity="store.severity"
        @query="store.query = $event"
        @severity="store.severity = $event"
      />
    </aside>
  </section>
</template>
