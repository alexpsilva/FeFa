import type { APIRoute } from "astro";

import formDataToJson from "@core/shared/utils/formDataToJson";
import { CreateTreatmentSchema } from "@core/treatment/types";
import { treatmentRepository } from "src";

export const POST: APIRoute = async ({ request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const { data, error, success } = CreateTreatmentSchema.safeParse({...formData, userId: locals.userId});
    if (!success) {
        return new Response(JSON.stringify({ error }), { status: 400 });
    }

    const treatment = await treatmentRepository.create(data);
    return new Response(null, { status: 201, headers: { 'X-Redirect-To': `/treatment/${treatment.id}` } });
};
