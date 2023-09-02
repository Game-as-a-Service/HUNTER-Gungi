<script setup lang="ts">
import TheGoma from '@/components/TheGoma.vue';
import type { Goma as GomaType, Side } from '@/typings/common';
import combine from '@/utils/combine';

type Area = 'RESERVATION' | 'DEAD';

const props = defineProps<{
  type: Area;
  side: Side;
  gomas: Array<Pick<GomaType, 'name' | 'side'>>;
}>();

const containerClass = combine(
  'w-72 h-72 flex items-start justify-start border-2 relative p-2 gap-1',
  props.type === 'RESERVATION' ? 'bg-lime-700' : 'bg-gray-700'
);
</script>

<template>
  <div :class="containerClass">
    <TheGoma v-for="({ name, side }, index) of gomas" :name="name" :side="side" :key="index" />
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 text-white">{{
      type === 'DEAD' ? 'Dead Zone' : '備用區'
    }}</span>
  </div>
</template>
