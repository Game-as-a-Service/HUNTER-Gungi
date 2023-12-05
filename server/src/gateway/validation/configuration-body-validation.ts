import { z } from 'zod';

const ConfigurationBodyValidator = z.object({
  playerId: z.string().refine((value) => value.trim() !== '', {
    message: 'The "playerId" field cannot be an empty string.',
  }),
});

export default ConfigurationBodyValidator;
