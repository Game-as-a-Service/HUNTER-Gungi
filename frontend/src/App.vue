<script setup lang="ts">
import Player from '@/components/Player.vue';
import Area from '@/components/Area.vue';
import Furigoma from '@/components/Furigoma.vue';
import * as fakeData from '@/api/fakeData';

// 可以先寫待會再重購嗎ＸＤ
const NUM = 11;
const board = [...Array(NUM)].map((_, row) => {
  return [...Array(NUM)].map((_, cell) => {
    return `${row},${cell}`;
  });
});
</script>

<template>
  <!-- name 可以被 form 認出來 -->
  <div class="w-full h-full flex flex-row items-center justify-around gap-10">
    <div class="flex flex-col items-center gap-10">
      <Player name="Opponent" />
      <Area type="RESERVATION" side="BLACK" :gomas="fakeData.blackGomas" />
      <Area type="DEAD" side="BLACK" :gomas="fakeData.blackGomas" />
    </div>
    <div class="board">
      <div class="row" v-for="row of board">
        <div v-for="cell of row" class="cell">
          <span>{{ cell }}</span>
        </div>
      </div>
      <!-- <Furigoma /> -->
    </div>
    <div class="flex flex-col items-center gap-10">
      <Area type="DEAD" side="WHITE" :gomas="fakeData.whiteGomas" />
      <Area type="RESERVATION" side="WHITE" :gomas="fakeData.whiteGomas" />
      <Player name="Me" />
    </div>
  </div>
</template>

<style scoped>
.board {
  @apply grid grid-cols-11;

  .row {
    background-color: chocolate;
  }
  .row:first-child,
  .row:last-child {
    background-color: black;
  }
  .row > .cell {
    @apply underline;
  }

  .cell {
    @apply text-black text-xs w-[40px] flex justify-center items-center;
    @apply border-black border-x-4 border-y-2 border-solid;
    aspect-ratio: 1/1;
    background-color: inherit;
  }
  .cell:not(:first-child):not(:last-child) {
    background-color: aquamarine;
  }
}
</style>
