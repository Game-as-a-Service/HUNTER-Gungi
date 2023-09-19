<script setup lang="ts">
import Player from '@/components/Player.vue';
import Area from '@/components/Area.vue';
import Board from './components/Board.vue';
import * as fakeData from '@/api/fakeData';
</script>

<template>
  <div class="w-full h-full flex flex-row items-center justify-around gap-10">
    <div class="flex flex-col items-center gap-10">
      <Player name="Opponent" />
      <Area type="RESERVATION" side="BLACK" :gomas="fakeData.blackGomas" />
      <Area type="DEAD" side="BLACK" :gomas="fakeData.blackGomas" />
    </div>
    <Board />
    <div class="flex flex-col items-center gap-10">
      <Area type="DEAD" side="WHITE" :gomas="fakeData.whiteGomas" />
      <Area type="RESERVATION" side="WHITE" :gomas="fakeData.whiteGomas" />
      <Player name="Me" />
    </div>
  </div>
</template>

<style scoped></style>
