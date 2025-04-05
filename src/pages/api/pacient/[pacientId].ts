import type { APIRoute } from "astro";

import { DeletePacientSchema, UpdatePacientSchema } from "@core/pacient/types";
import formDataToJson from "@core/shared/utils/formDataToJson";
import tryCatch from "@core/shared/utils/tryCatch";
import { pacientRepository } from "src";

export const DELETE: APIRoute = async ({ params, locals }) => {
    const parseResult = DeletePacientSchema.safeParse({id: params.pacientId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }
    const { id, userId } = parseResult.data;  

    const repositoryResult = await tryCatch(pacientRepository.delete({ userId, id }));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/pacient` } });
}

export const PUT: APIRoute = async ({ params, request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const parseResult = UpdatePacientSchema.safeParse({...formData, id: params.pacientId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }

    const repositoryResult = await tryCatch(pacientRepository.update(parseResult.data));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/pacient/${params.pacientId}` } });
}