import { z } from "zod";

import { pacientRepository } from "$lib/server";

import numberOrString from "$lib/schemas/number_or_string";
import { UserSchema } from "$lib/schemas/core/user";
import searchParam from "$lib/utils/http/searchParam";
import { config } from "$lib/config";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url, locals }) => {
    const ListPacientsDto = z.object({
        userId: UserSchema.shape.id,
        searchTerm: z.string().default(''),
        pageNumber: numberOrString.default(1),
        pageSize: numberOrString.default(config.pacientListDefaultPageSize)
    });

    const { userId, searchTerm, pageNumber, pageSize } = ListPacientsDto.parse({ 
        userId: locals.userId, 
        searchTerm: searchParam(url, 'searchTerm'),
        pageNumber: searchParam(url, 'pageNumber'),
        pageSize: searchParam(url, 'pageSize')
    });
    
    return {
        pacients: pacientRepository.findAll(userId, searchTerm, { number: pageNumber, size: pageSize })
    };
}