import { computed } from 'vue';
import { useTelemetryStore } from '../stores/useTelemetryStore';

export function useRealTimeData() {
  const store = useTelemetryStore();

  return {
    points: computed(() => store.visiblePoints),
    events: computed(() => store.filteredEvents),
    paused: computed(() => store.paused),
    pause: store.pause,
    resume: store.resume
  };
}
