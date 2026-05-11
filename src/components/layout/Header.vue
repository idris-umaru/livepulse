<script setup lang="ts">
defineProps<{
  status: string;
}>();
</script>

<template>
  <header class="topbar">
    <div>
      <span class="eyebrow">LivePulse Command Center</span>
      <h1>Real-time telemetry analytics</h1>
    </div>
    <div class="status-pill" :class="status">
      <i></i>{{ status }}
    </div>
  </header>
</template>
