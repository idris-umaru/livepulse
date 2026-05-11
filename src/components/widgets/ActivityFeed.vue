<script setup lang="ts">
import type { ActivityEvent } from '../../types';

defineProps<{
  events: ActivityEvent[];
  query: string;
  severity: string;
}>();

const emit = defineEmits<{
  query: [value: string];
  severity: [value: string];
}>();
</script>

<template>
  <section class="panel feed-panel">
    <div class="panel-title">
      <div>
        <p>Live Activity</p>
        <span>{{ events.length }} visible events</span>
      </div>
      <select :value="severity" @change="emit('severity', ($event.target as HTMLSelectElement).value)">
        <option value="all">All</option>
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="critical">Critical</option>
      </select>
    </div>
    <input
      class="search"
      type="search"
      placeholder="Search logs"
      :value="query"
      @input="emit('query', ($event.target as HTMLInputElement).value)"
    />
    <div class="feed-list">
      <article v-for="event in events.slice(0, 80)" :key="event.id" class="feed-row">
        <time>{{ new Date(event.timestamp).toLocaleTimeString() }}</time>
        <span :class="['severity', event.severity]">{{ event.severity }}</span>
        <strong>{{ event.source }}</strong>
        <p>{{ event.message }} · {{ event.metric }} {{ event.value }}</p>
      </article>
      <div v-if="events.length === 0" class="empty-feed">No matching activity yet</div>
    </div>
  </section>
</template>
