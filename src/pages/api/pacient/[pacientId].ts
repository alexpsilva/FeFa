import type { APIRoute } from "astro";

import { DeletePacientSchema } from "@core/pacient/types";
import { pacientRepository } from "src";
import tryCatch from "@core/shared/utils/tryCatch";

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
