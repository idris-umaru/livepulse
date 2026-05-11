<script setup lang="ts">
import type { DatasetOption } from '../../types';

defineProps<{
  datasets: DatasetOption[];
  selected: string[];
}>();

const emit = defineEmits<{
  toggle: [id: string];
}>();
</script>

<template>
  <section class="panel compact-panel">
    <div class="panel-title">
      <p>Datasets</p>
      <span>Toggle overlays</span>
    </div>
    <div class="dataset-grid">
      <button
        v-for="dataset in datasets"
        :key="dataset.id"
        type="button"
        :class="{ active: selected.includes(dataset.id) }"
        @click="emit('toggle', dataset.id)"
      >
        <i :style="{ background: dataset.color }"></i>
        {{ dataset.label }}
      </button>
    </div>
  </section>
</template>
