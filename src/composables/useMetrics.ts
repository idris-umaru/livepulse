import { computed } from 'vue';
import { useTelemetryStore } from '../stores/useTelemetryStore';

export function useMetrics() {
  const store = useTelemetryStore();

  return {
    latest: computed(() => store.latest),
    datasets: computed(() => store.datasets),
    selectedDatasetOptions: computed(() => store.selectedDatasetOptions)
  };
}
