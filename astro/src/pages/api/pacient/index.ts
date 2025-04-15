import type { APIRoute } from "astro";

import { CreatePacientSchema } from "@core/pacient/types";
import { pacientRepository } from "src";
import formDataToJson from "@core/shared/utils/formDataToJson";

export const POST: APIRoute = async ({ request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const { data, error, success } = CreatePacientSchema.safeParse({...formData, userId: locals.userId});
    if (!success) {
        return new Response(JSON.stringify({ error }), { status: 400 });
    }

    const pacient = await pacientRepository.create(data);
    return new Response(null, { status: 201, headers: { 'X-Redirect-To': `/pacient/${pacient.id}` } });
};
