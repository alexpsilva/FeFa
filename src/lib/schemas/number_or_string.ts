import { z } from 'zod';

const numberOrString = z.union([z.string(), z.number()])
    .transform((x) => Number(x))
    .pipe(z.number());

export default numberOrString;