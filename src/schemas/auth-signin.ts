import {z} from "zod";

export const authSigninInSchema = z.object({
    email: z.string({message: 'campo email é obrigatório'}).email('email invalido') //validação de requisicao login
})

