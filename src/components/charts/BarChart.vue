<script setup lang="ts">
import RealTimeChart from './RealTimeChart.vue';
import type { DatasetOption, TelemetryPoint } from '../../types';

defineProps<{
  points: TelemetryPoint[];
  datasets: DatasetOption[];
  title: string;
}>();
</script>

<template>
  <RealTimeChart :title="title" :points="points" :datasets="datasets" kind="bar" />
</template>
