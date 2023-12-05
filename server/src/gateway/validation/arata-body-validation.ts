import { z } from 'zod';
import SIDE from '../../domain/constant/SIDE';
import GOMA from '../../domain/constant/GOMA';

const ArataBodyValidator = z.object({
  playerId: z.string(),
  goma: z.object({
    name: z.enum(Object.values(GOMA) as [string, ...string[]]),
    side: z.enum(Object.values(SIDE) as [string, ...string[]]),
  }),
  to: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
});

export default ArataBodyValidator;
