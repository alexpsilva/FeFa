import { z } from 'zod';

const PaginationDto = z.object({
    pageNumber: z.coerce.number(),
    pageSize: z.coerce.number(),
});

export { PaginationDto };
export type PaginationDto = z.infer<typeof PaginationDto>;