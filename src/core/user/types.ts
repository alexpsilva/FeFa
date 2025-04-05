import { z } from "astro:content";

const UserSchema = z.object({
    id: z.number(),
    
    name: z.string(),
    email: z.string(),

    updated_at: z.date(),
    created_at: z.date(),
});

export { UserSchema };

export type User = z.infer<typeof UserSchema>;