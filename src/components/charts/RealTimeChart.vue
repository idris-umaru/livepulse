<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { ChartKind, DatasetOption, TelemetryPoint } from '../../types';

const props = defineProps<{
  points: TelemetryPoint[];
  datasets: DatasetOption[];
  kind: ChartKind;
  title: string;
}>();

const emit = defineEmits<{
  inspect: [point: TelemetryPoint | null];
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const hover = ref<{ x: number; y: number; point: TelemetryPoint } | null>(null);
let frame = 0;
let ro: ResizeObserver | null = null;

const empty = computed(() => props.points.length < 2 || props.datasets.length === 0);

function scale(value: number, min: number, max: number, height: number) {
  if (max === min) return height / 2;
  return height - ((value - min) / (max - min)) * height;
}

function draw() {
  const target = canvas.value;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  target.width = Math.max(1, Math.floor(rect.width * dpr));
  target.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = target.getContext('2d');
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  const pad = { top: 18, right: 18, bottom: 28, left: 42 };
  const width = rect.width - pad.left - pad.right;
  const height = rect.height - pad.top - pad.bottom;
  const sampleEvery = Math.max(1, Math.floor(props.points.length / 360));
  const points = props.points.filter((_, index) => index % sampleEvery === 0);

  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid');
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + (height / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + width, y);
    ctx.stroke();
  }

  props.datasets.forEach((dataset, datasetIndex) => {
    const values = points.map((point) => Number(point[dataset.id]));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const rangePadding = Math.max(1, (max - min) * 0.12);
    const adjustedMin = min - rangePadding;
    const adjustedMax = max + rangePadding;

    if (props.kind === 'bar') {
      const barWidth = Math.max(2, width / Math.max(1, points.length) / props.datasets.length);
      ctx.fillStyle = dataset.color;
      ctx.globalAlpha = 0.64;
      points.forEach((point, index) => {
        const x = pad.left + (index / Math.max(1, points.length - 1)) * width + datasetIndex * barWidth;
        const y = pad.top + scale(Number(point[dataset.id]), adjustedMin, adjustedMax, height);
        ctx.fillRect(x, y, barWidth, pad.top + height - y);
      });
      ctx.globalAlpha = 1;
      return;
    }

    const path = new Path2D();
    points.forEach((point, index) => {
      const x = pad.left + (index / Math.max(1, points.length - 1)) * width;
      const y = pad.top + scale(Number(point[dataset.id]), adjustedMin, adjustedMax, height);
      if (index === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    });

    if (props.kind === 'area') {
      const area = new Path2D(path);
      area.lineTo(pad.left + width, pad.top + height);
      area.lineTo(pad.left, pad.top + height);
      area.closePath();
      const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + height);
      gradient.addColorStop(0, `${dataset.color}66`);
      gradient.addColorStop(1, `${dataset.color}08`);
      ctx.fillStyle = gradient;
      ctx.fill(area);
    }

    ctx.strokeStyle = dataset.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke(path);
  });

  if (hover.value) {
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted');
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(hover.value.x, pad.top);
    ctx.lineTo(hover.value.x, pad.top + height);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

function scheduleDraw() {
  window.cancelAnimationFrame(frame);
  frame = window.requestAnimationFrame(draw);
}

function inspect(event: MouseEvent) {
  const target = canvas.value;
  if (!target || props.points.length === 0) return;
  const rect = target.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - 42) / Math.max(1, rect.width - 60)));
  const index = Math.min(props.points.length - 1, Math.max(0, Math.round(ratio * (props.points.length - 1))));
  hover.value = { x: event.clientX - rect.left, y: event.clientY - rect.top, point: props.points[index] };
  emit('inspect', props.points[index]);
  scheduleDraw();
}

function leave() {
  hover.value = null;
  emit('inspect', null);
  scheduleDraw();
}

watch(() => [props.points, props.datasets, props.kind], scheduleDraw, { deep: false, immediate: true });

watch(canvas, (target) => {
  if (!target) return;
  ro = new ResizeObserver(scheduleDraw);
  ro.observe(target);
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frame);
  ro?.disconnect();
});
</script>

<template>
  <section class="panel chart-panel">
    <div class="panel-title">
      <div>
        <p>{{ title }}</p>
        <span>{{ points.length.toLocaleString() }} samples</span>
      </div>
      <div class="legend">
        <span v-for="dataset in datasets" :key="dataset.id">
          <i :style="{ background: dataset.color }"></i>{{ dataset.label }}
        </span>
      </div>
    </div>
    <div class="chart-wrap">
      <canvas ref="canvas" @mousemove="inspect" @mouseleave="leave"></canvas>
      <div v-if="empty" class="empty-state">Waiting for live telemetry</div>
      <div v-if="hover" class="tooltip" :style="{ left: `${hover.x + 12}px`, top: `${hover.y + 12}px` }">
        {{ new Date(hover.point.timestamp).toLocaleTimeString() }}
      </div>
    </div>
  </section>
</template>
