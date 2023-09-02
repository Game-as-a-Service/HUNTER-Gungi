<script setup lang="ts">
import type { Side } from '@/typings/common';
import combine from '@/utils/combine';

const props = defineProps<{
  side: Side;
  name: string;
}>();

const containerClass = combine(
  'w-12 h-12 rounded-full p-1 border-8 flex items-center justify-center',
  props.side === 'BLACK' ? 'bg-white border-black text-black' : 'bg-black border-white text-white'
);
</script>

<template>
  <div :class="containerClass">
    <span class="font-medium">{{ name }}</span>
  </div>
</template>
