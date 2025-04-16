import { z } from "zod";

import { config } from "$lib/config";

import numberOrString from "$lib/schemas/number_or_string";

export const ListPacientsDto = z.object({
    searchTerm: z.string().default(''),
    pageNumber: numberOrString.default(1),
    pageSize: numberOrString.default(config.pacientListDefaultPageSize)
});