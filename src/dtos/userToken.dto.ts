import {z } from 'zod'

export const UserTokenDTOSchema=z.object({

  username:z.string().min(8),
  roles:z.array(z.string()).nonempty()
});


export type UserTokenDTO =z.infer<typeof UserTokenDTOSchema>;