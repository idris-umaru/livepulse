<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost';
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: 'ghost',
    type: 'button'
  }
);
</script>

<template>
  <button :class="variant" :type="type">
    <slot />
  </button>
</template>
