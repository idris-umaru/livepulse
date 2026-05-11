import { computed } from 'vue';
import { useTelemetryStore } from '../stores/useTelemetryStore';

export function useChartConfig() {
  const store = useTelemetryStore();

  return {
    chartKind: computed(() => store.chartKind),
    timeRange: computed(() => store.timeRange),
    setChartKind: store.setChartKind,
    setRange: store.setRange,
    toggleDataset: store.toggleDataset
  };
}
