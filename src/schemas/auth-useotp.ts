import { z } from "zod";

export const authUseOTPSchema = z.object({
  id: z.string({ message: "id do otp obrigatório" }),
  code: z
    .string({ message: "OTP obrigatório" })
    .length(6, "código precisa de 6 numeros"),//verificação para uso do OTP
});
