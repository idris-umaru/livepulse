<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  unit: string;
  delta: string;
  tone: 'good' | 'warn' | 'bad' | 'neutral';
}>();
</script>

<template>
  <article class="metric-card">
    <span>{{ label }}</span>
    <strong>{{ value }} <small>{{ unit }}</small></strong>
    <em :class="tone">{{ delta }}</em>
  </article>
</template>
