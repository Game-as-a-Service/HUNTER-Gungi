<script setup lang="ts">
defineProps({
  name: String
});
</script>

<template>
  <div class="rounded-full w-32 h-32 bg-lime-700 flex items-center justify-center">
    <h3 class="text-xl font-bold">
      {{ name }}
    </h3>
  </div>
</template>
