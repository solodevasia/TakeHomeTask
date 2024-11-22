import { z } from 'zod';

export const queryUserList = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  pic: z.string().optional(),
  role: z.number().default(0),
  page: z.number().default(1),
  limit: z.number().default(10),
});

export type QueryUserList = z.infer<typeof queryUserList>;
