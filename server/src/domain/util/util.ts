import Coordinate from '../Coordinate';
import { BOUNDARY, HEIGHT_LIMIT } from '../constant/GUNGI_HAN';
import { ERROR_MESSAGE } from '../constant/ERROR_MESSAGE';

function isOutOfBoundary(coordinate: Coordinate) {
  const { x, y } = coordinate;

  return (
    x < BOUNDARY.LEFT ||
    x > BOUNDARY.RIGHT ||
    y < BOUNDARY.BOTTOM ||
    y > BOUNDARY.TOP
  );
}

function isOverHeight(coordinate: Coordinate, level) {
  const { z } = coordinate;
  const heightLimit = HEIGHT_LIMIT[level];
  return z > heightLimit;
}

function validateGungiHanBoundaries(to: Coordinate, limitLevel: number) {
  if (isOutOfBoundary(to)) {
    throw new Error(ERROR_MESSAGE.OUTSIDE_HAN);
  }
  if (isOverHeight(to, limitLevel)) {
    throw new Error(ERROR_MESSAGE.OVER_HEIGHT);
  }
}

export { validateGungiHanBoundaries };
