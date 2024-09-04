import { z } from "zod";

// to-do: Validate CPF rules
const CpfString = z.string()
    .transform((cpf) => cpf.trim())
    .superRefine((cpf, ctx) => { 
        if(cpf.length !== 11) {
            ctx.addIssue({ 
                code: z.ZodIssueCode.custom, 
                message: 'CPF must have 11 characters',

            });
            return z.NEVER;
        }
        return cpf;
    })
    .superRefine((cpf, ctx) => {
        if(!cpf.match(/^[0-9]+$/)) {
            ctx.addIssue({ 
                code: z.ZodIssueCode.custom, 
                message: 'CPF must have only numbers',
            });
            return z.NEVER;
        }
        return cpf;
    });

export {
    CpfString,
}