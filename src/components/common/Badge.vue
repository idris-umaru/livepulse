<script setup lang="ts">
defineProps<{
  tone?: 'info' | 'warning' | 'critical' | 'neutral';
}>();
</script>

<template>
  <span :class="['severity', tone ?? 'neutral']">
    <slot />
  </span>
</template>
