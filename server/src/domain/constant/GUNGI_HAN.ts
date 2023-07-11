import LEVEL from './LEVEL';
import GOMA from './GOMA';

const BOUNDARY = {
  LEFT: 0,
  RIGHT: 8,
  BOTTOM: 0,
  TOP: 8,
};

const HEIGHT_LIMIT = {
  [LEVEL.BEGINNER]: 1,
};

const WHITE_HAN_CONFIG = [
  { name: GOMA.OSHO, x: 4, y: 0, z: 0 },
  { name: GOMA.HEI, x: 0, y: 2, z: 0 },
  { name: GOMA.HEI, x: 4, y: 2, z: 0 },
  { name: GOMA.HEI, x: 8, y: 2, z: 0 },
  { name: GOMA.SHINOBI, x: 1, y: 1, z: 0 },
  { name: GOMA.SHINOBI, x: 7, y: 1, z: 0 },
  { name: GOMA.YARI, x: 4, y: 1, z: 0 },
  { name: GOMA.CHU, x: 5, y: 0, z: 0 },
  { name: GOMA.DAI, x: 3, y: 0, z: 0 },
  { name: GOMA.SHI, x: 3, y: 2, z: 0 },
  { name: GOMA.SHI, x: 5, y: 2, z: 0 },
  { name: GOMA.TORIDE, x: 2, y: 2, z: 0 },
  { name: GOMA.TORIDE, x: 6, y: 2, z: 0 },
];

const BLACK_HAN_CONFIG = [
  { name: GOMA.OSHO, x: 4, y: 8, z: 0 },
  { name: GOMA.HEI, x: 0, y: 6, z: 0 },
  { name: GOMA.HEI, x: 4, y: 6, z: 0 },
  { name: GOMA.HEI, x: 8, y: 6, z: 0 },
  { name: GOMA.SHINOBI, x: 1, y: 7, z: 0 },
  { name: GOMA.SHINOBI, x: 7, y: 7, z: 0 },
  { name: GOMA.YARI, x: 4, y: 7, z: 0 },
  { name: GOMA.CHU, x: 3, y: 8, z: 0 },
  { name: GOMA.DAI, x: 5, y: 8, z: 0 },
  { name: GOMA.SHI, x: 3, y: 6, z: 0 },
  { name: GOMA.SHI, x: 5, y: 6, z: 0 },
  { name: GOMA.TORIDE, x: 2, y: 6, z: 0 },
  { name: GOMA.TORIDE, x: 6, y: 6, z: 0 },
];

const OKI_CONFIG = [
  { name: GOMA.HEI },
  { name: GOMA.SHO },
  { name: GOMA.SHO },
  { name: GOMA.UMA },
  { name: GOMA.UMA },
  { name: GOMA.YARI },
  { name: GOMA.YARI },
];

export {
  BOUNDARY,
  HEIGHT_LIMIT,
  WHITE_HAN_CONFIG,
  BLACK_HAN_CONFIG,
  OKI_CONFIG,
};
