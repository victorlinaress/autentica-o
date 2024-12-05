import {z} from "zod";

export const authSignUpinInSchema = z.object ({
    name: z.string ({message: 'campo name é obrigatório'}),
    email: z.string ({message: 'campo email é obrigatório'}).email('email invalido') //validação de requisicao cadastro
})
})