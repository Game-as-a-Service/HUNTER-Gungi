import { z } from 'zod';

const playerSchema = z.object({
  id: z.string(),
  nickname: z.string(),
});

const CreateGungiValidator = z.object({
  players: z.array(playerSchema).refine((players) => players.length === 2, {
    message: 'The "players" array must contain exactly 2 players.',
  }),
});

export default CreateGungiValidator;
