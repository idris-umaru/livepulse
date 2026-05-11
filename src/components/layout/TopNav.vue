<script setup lang="ts">
const links = [
  { path: '/', label: 'Dashboard' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/settings', label: 'Settings' }
];
</script>

<template>
  <nav class="topnav" aria-label="Primary">
    <RouterLink v-for="link in links" :key="link.path" :to="link.path">{{ link.label }}</RouterLink>
  </nav>
</template>
