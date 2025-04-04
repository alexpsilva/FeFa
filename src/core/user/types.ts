import { z } from "astro:content";

const User = z.object({
    id: z.number(),
    
    name: z.string(),
    email: z.string(),

    updated_at: z.date(),
    created_at: z.date(),
});

export { User };
export type User = z.infer<typeof User>;