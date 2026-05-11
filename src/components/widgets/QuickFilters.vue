<script setup lang="ts">
import type { ChartKind, TimeRange } from '../../types';

defineProps<{
  paused: boolean;
  status: string;
  timeRange: TimeRange;
  chartKind: ChartKind;
  theme: 'dark' | 'light';
}>();

const emit = defineEmits<{
  pause: [];
  resume: [];
  retry: [];
  range: [range: TimeRange];
  chart: [kind: ChartKind];
  theme: [theme: 'dark' | 'light'];
}>();

const ranges: Array<{ label: string; value: TimeRange }> = [
  { label: '1m', value: 60 },
  { label: '5m', value: 300 },
  { label: '15m', value: 900 },
  { label: '1h', value: 3600 }
];

const chartKinds: Array<{ label: string; value: ChartKind }> = [
  { label: 'Line', value: 'line' },
  { label: 'Area', value: 'area' },
  { label: 'Bar', value: 'bar' }
];
</script>

<template>
  <section class="controls">
    <button class="primary" type="button" @click="paused ? emit('resume') : emit('pause')">
      {{ paused ? 'Resume' : 'Pause' }}
    </button>
    <button class="ghost" type="button" @click="emit('retry')">Reconnect</button>

    <div class="segmented" aria-label="Time range">
      <button
        v-for="range in ranges"
        :key="range.value"
        type="button"
        :class="{ active: timeRange === range.value }"
        @click="emit('range', range.value)"
      >
        {{ range.label }}
      </button>
    </div>

    <div class="segmented" aria-label="Chart type">
      <button
        v-for="kind in chartKinds"
        :key="kind.value"
        type="button"
        :class="{ active: chartKind === kind.value }"
        @click="emit('chart', kind.value)"
      >
        {{ kind.label }}
      </button>
    </div>

    <button class="ghost" type="button" @click="emit('theme', theme === 'dark' ? 'light' : 'dark')">
      {{ theme === 'dark' ? 'Light' : 'Dark' }}
    </button>
  </section>
</template>
