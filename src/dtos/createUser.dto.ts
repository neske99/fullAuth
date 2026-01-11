import {z } from 'zod'

export const CreateUserDTOSchema=z.object({

  username:z.string().min(8),
  password:z.string(),
});


export type CreateUserDTO =z.infer<typeof CreateUserDTOSchema>;
