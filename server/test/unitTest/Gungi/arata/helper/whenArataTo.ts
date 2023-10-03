import GOMA from '../../../../../src/domain/constant/GOMA';
import Gungi from '../../../../../src/domain/Gungi';
import Player from '../../../../../src/domain/Player';
import SIDE from '../../../../../src/domain/constant/SIDE';
import Coordinate from '../../../../../src/domain/Coordinate';

function when_arata_at_han(
  gungi: Gungi,
  player: Player,
  targetGoma: { side: SIDE; name: GOMA },
  to: Coordinate,
) {
  return gungi.arata(player, targetGoma, to);
}

export default when_arata_at_han;
