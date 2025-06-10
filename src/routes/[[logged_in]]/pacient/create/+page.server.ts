import { pacientRepository } from "$lib/server";
import { CreatePacientSchema } from "$lib/schemas/core/pacient";

import formDataToJson from "$lib/utils/http/formDataToJson";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
    create: async ({ request, locals }) => {
        const formData = formDataToJson(await request.formData());
        const { data, error, success } = CreatePacientSchema.safeParse({...formData, userId: locals.userId});
        if (!success) {
            return fail(400, { error });
        }
    
        const pacient = await pacientRepository.create(data);
        return redirect(303, `/pacient/${pacient.id}`);
    }
} satisfies Actions;