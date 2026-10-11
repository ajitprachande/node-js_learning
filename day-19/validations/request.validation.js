import { z } from 'zod';

export const signupPostRequestBodySchema = z.object({
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4).max(15)
});

export const loginPostRequestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(15)
});


export const shortenPostRequestBodySchema = z.object({
    url: z.string().url(),
    shortCode: z.string().optional()
})


