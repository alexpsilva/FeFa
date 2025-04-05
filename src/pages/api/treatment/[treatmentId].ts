import type { APIRoute } from "astro";

import { DeleteTreatmentSchema, UpdateTreatmentSchema } from "@core/treatment/types";
import formDataToJson from "@core/shared/utils/formDataToJson";
import tryCatch from "@core/shared/utils/tryCatch";
import { treatmentRepository } from "src";

export const DELETE: APIRoute = async ({ params, locals }) => {
    const parseResult = DeleteTreatmentSchema.safeParse({id: params.treatmentId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }
    const { id, userId } = parseResult.data;  

    const repositoryResult = await tryCatch(treatmentRepository.delete({ userId, id }));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/treatment` } });
}

export const PUT: APIRoute = async ({ params, request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const parseResult = UpdateTreatmentSchema.safeParse({...formData, id: params.treatmentId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }

    const repositoryResult = await tryCatch(treatmentRepository.update(parseResult.data));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/treatment/${params.treatmentId}` } });
}