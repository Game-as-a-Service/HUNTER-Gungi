import type { Goma } from '@/typings/common';

export const blackGomas: Pick<Goma, 'name' | 'side'>[] = [
  {
    name: '兵',
    side: 'BLACK'
  },
  {
    name: '槍',
    side: 'BLACK'
  },
  {
    name: '槍',
    side: 'BLACK'
  },
  {
    name: '槍',
    side: 'BLACK'
  }
];

export const whiteGomas: Pick<Goma, 'name' | 'side'>[] = [
  {
    name: '兵',
    side: 'WHITE'
  },
  {
    name: '槍',
    side: 'WHITE'
  }
];
