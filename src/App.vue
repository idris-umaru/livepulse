<script setup lang="ts">
import DashboardLayout from './components/layout/DashboardLayout.vue';
import { useTelemetryStore } from './stores/useTelemetryStore';

const store = useTelemetryStore();
</script>

<template>
  <DashboardLayout :status="store.status">
    <RouterView />
  </DashboardLayout>
</template>
