<script setup lang="ts">
import Furigoma from './Furigoma.vue';

type BoardCell = {
  row: string;
  column: string;
};

// import { HAN_X_MAX, HAN_Y_MAX, HAN_Z_MAX } from '@/../../server/src/domain/constant/constants';
const HAN_X_MAX = 9;
const HAN_Y_MAX = 9;

const board: BoardCell[][] = [...Array(HAN_X_MAX + 2)].map((_, row) =>
  [...Array(HAN_Y_MAX + 2)].map((_, cell) => ({
    column: String.fromCharCode(65 + row - 1),
    row: String(HAN_Y_MAX - cell + 1)
  }))
);
</script>

<template>
  <Furigoma />
  <div class="board">
    <div class="row" v-for="row of board" :key="row[0].column">
      <div
        v-for="cell of row"
        class="cell"
        :key="cell.row"
        :data-col="cell.column"
        :data-row="cell.row"
      >
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(11, minmax(0, 1fr));

  > .row:nth-child(10n + 1) > :nth-child(10n + 1) {
    background-color: var(--color-background);

    > ::after {
      display: none;
    }
  }

  > .row {
    &:nth-child(10n + 1) > .cell::after {
      content: attr(data-row);
      font-size: 2rem;
    }

    > .cell:nth-child(10n + 1)::after {
      content: attr(data-col);
      font-size: 2rem;
    }

    > .cell {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 50px;
      aspect-ratio: 1/1;

      border: solid 1px var(--color-border);
      color: var(--vt-c-black);
      background-color: var(--color-background-board);

      &:hover {
        animation: breathing-light 0.7s infinite;
        border-color: #ffffffff;
      }
    }
  }
}

@keyframes breathing-light {
  0% {
    outline: 3px solid blue;
    scale: 95%;
  }

  10% {
    outline: 4px solid blue;
  }

  100% {
    outline: 5px solid blue;
    scale: 100%;
  }
}
</style>
