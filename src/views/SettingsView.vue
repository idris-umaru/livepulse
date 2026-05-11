<script setup lang="ts">
import { useTelemetryStore } from '../stores/useTelemetryStore';

const store = useTelemetryStore();
</script>

<template>
  <section class="panel settings-panel">
    <div class="panel-title">
      <div>
        <p>Settings</p>
        <span>Runtime preferences</span>
      </div>
    </div>
    <button class="ghost" type="button" @click="store.setTheme(store.theme === 'dark' ? 'light' : 'dark')">
      {{ store.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode' }}
    </button>
  </section>
</template>
