<script setup lang="ts">
import LineChart from '../components/charts/LineChart.vue';
import { useTelemetryStore } from '../stores/useTelemetryStore';

const store = useTelemetryStore();
</script>

<template>
  <section class="panel">
    <div class="panel-title">
      <div>
        <p>Analytics Workbench</p>
        <span>Long-window telemetry inspection</span>
      </div>
    </div>
    <LineChart title="Telemetry Trend" :points="store.visiblePoints" :datasets="store.selectedDatasetOptions" />
  </section>
</template>
