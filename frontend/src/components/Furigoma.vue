<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { GameState } from '@/typings/GameState';

const results = [1, 0, 1, 0, 1];

const { gameState, player } = usePlayerStore();

/** 只有房主可以擲駒 */
const furigoma = () => {
  // TODO
};
</script>

<template>
  <div
    class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-8"
  >
    <!-- 擲駒的結果，有五個棋子顯示正反面 -->
    <div class="flex flex-row gap-4">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center p-1 border-[12px] border-black text-black text-4xl"
        :class="result === 1 ? 'bg-white' : 'bg-black'"
        v-for="result of results"
        :key="result"
      >
        兵
      </div>
    </div>
    <button
      class="w-20 h-20 rounded-full flex items-center justify-center p-1 border-4 bg-lime-700 border-black text-white text-2xl"
      type="button"
      @click="furigoma"
      v-if="player.side === 'WHITE' && gameState === GameState.GAME_INIT"
    >
      擲駒
    </button>
    <span class="rounded-md p-2 text-black text-2xl font-bold tracking-widest" v-else
      >等待房主擲駒...</span
    >
  </div>
</template>
