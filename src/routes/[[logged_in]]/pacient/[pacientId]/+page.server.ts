import { z } from "zod";
import { fail, redirect, type Actions } from "@sveltejs/kit";

import { pacientRepository } from "$lib/server";

import { UserSchema } from "$lib/schemas/core/user";
import { DeletePacientSchema, PacientSchema, UpdatePacientSchema } from "$lib/schemas/core/pacient";
import formDataToJson from "$lib/utils/http/formDataToJson";
import tryCatch from "$lib/utils/tryCatch";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params, locals }) => {
    const GetPacientDto = z.object({
        userId: UserSchema.shape.id,
        pacientId: PacientSchema.shape.id,
    });

    const { userId, pacientId } = GetPacientDto.parse({ 
        userId: locals.userId, 
        pacientId: params.pacientId,
    });

    return {
        pacient: pacientRepository.findById(userId, pacientId)
    };
}

export const actions = {
    update: async ({ request, locals, params }) => {
        const formData = formDataToJson(await request.formData());
        const parseResult = UpdatePacientSchema.safeParse({...formData, id: params.pacientId, userId: locals.userId});
        if (!parseResult.success) {
            return fail(400, { error: parseResult.error });
        }
    
        const repositoryResult = await tryCatch(pacientRepository.update(parseResult.data));
        if (!repositoryResult.success) {
            return fail(500, { error: repositoryResult.error });
        }
    
        return redirect(303, `/pacient/${params.pacientId}`);
    },
    delete: async ({ locals, params }) => {
        const parseResult = DeletePacientSchema.safeParse({id: params.pacientId, userId: locals.userId});
        if (!parseResult.success) {
            return fail(400, { error: parseResult.error });
        }
        const { id, userId } = parseResult.data;  

        const repositoryResult = await tryCatch(pacientRepository.delete({ userId, id }));
        if (!repositoryResult.success) {
            return fail(500, { error: repositoryResult.error });
        }

        return redirect(303, `/pacient`);
    }
} satisfies Actions;