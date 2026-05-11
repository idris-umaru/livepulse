import { computed } from 'vue';
import { useTelemetryStore } from '../stores/useTelemetryStore';
export function useWebSocket() {
    const store = useTelemetryStore();
    return {
        status: computed(() => store.status),
        connect: store.connect,
        disconnect: store.disconnect,
        retry: store.retry
    };
}
