import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Player } from '@/typings/common';
import { GameState } from '@/typings/GameState';

export const usePlayerStore = defineStore('player', () => {
  const gameState = ref<GameState>(GameState.GAME_INIT);
  const player = ref<Player>({
    id: '',
    name: '',
    side: 'WHITE'
  });

  return { gameState, player };
});
