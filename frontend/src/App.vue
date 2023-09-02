<script setup lang="ts">
import ThePlayer from '@/components/ThePlayer.vue';
import TheArea from '@/components/TheArea.vue';
import TheBoard from './components/TheBoard.vue';
import TheFurigoma from '@/components/TheFurigoma.vue';
import * as fakeData from '@/api/fakeData';
</script>

<template>
  <div class="w-full h-full flex flex-row items-center justify-around gap-10">
    <div class="flex flex-col items-center gap-10">
      <ThePlayer name="Opponent" />
      <TheArea type="RESERVATION" side="BLACK" :gomas="fakeData.blackGomas" />
      <TheArea type="DEAD" side="BLACK" :gomas="fakeData.blackGomas" />
    </div>
    <TheBoard />
    <!-- <TheFurigoma /> -->
    <div class="flex flex-col items-center gap-10">
      <TheArea type="DEAD" side="WHITE" :gomas="fakeData.whiteGomas" />
      <TheArea type="RESERVATION" side="WHITE" :gomas="fakeData.whiteGomas" />
      <ThePlayer name="Me" />
    </div>
  </div>
</template>

<style scoped></style>
