import type { APIRoute } from "astro";

import { DeleteMedicationSchema, UpdateMedicationSchema } from "@core/medication/types";
import formDataToJson from "@core/shared/utils/formDataToJson";
import tryCatch from "@core/shared/utils/tryCatch";
import { medicationRepository } from "src";

export const DELETE: APIRoute = async ({ params, locals }) => {
    const parseResult = DeleteMedicationSchema.safeParse({id: params.medicationId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }
    const { id, userId } = parseResult.data;  

    const repositoryResult = await tryCatch(medicationRepository.delete({ userId, id }));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/medication` } });
}

export const PUT: APIRoute = async ({ params, request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const parseResult = UpdateMedicationSchema.safeParse({...formData, id: params.medicationId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }

    const repositoryResult = await tryCatch(medicationRepository.update(parseResult.data));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/medication/${params.medicationId}` } });
}