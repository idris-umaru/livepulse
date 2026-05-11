<script setup lang="ts">
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import TopNav from './TopNav.vue';

defineProps<{
  status: string;
}>();
</script>

<template>
  <main class="app-shell">
    <TopNav />
    <Header :status="status" />
    <div class="layout-grid">
      <Sidebar />
      <section class="layout-content">
        <slot />
      </section>
    </div>
  </main>
</template>
