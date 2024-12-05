import { RequestHandler } from "express";
import { authSigninInSchema } from "../schemas/auth-signin";
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validadteOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { authSignUpinInSchema } from "../schemas/auth-signup";
import { authUseOTPSchema } from "../schemas/auth-useotp";
import { createJWT } from '../libs/jwt';


export const signin: RequestHandler = async (req, res) => {
  // validar dados recebidos
  const data = authSigninInSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  // verificar se o usuário existe baseado no email
  const user = await getUserByEmail(data.data.email);
  if (!user) {
    res.json({ error: "usuário não existe" });
    return;
  }

  // gerar o código OTP para este usuário
  const otp = await generateOTP(user.id);

  // enviar um email para o usuário
  await sendEmail(
    user.email,
    "seu código de acesso é " + otp.code,
    "digite seu código" + otp.code
  );

  // devolve o id do código OTP
  res.json({ id: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
  // validar os dados recebidos
  const data = authSignUpinInSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  // verifica se o email existe
  const user = await getUserByEmail(data.data.email);
  if (user) {
    res.json({ error: "já existe usuário com esse email" });
    return;
  }

  // criar o usuário
  const newUser = await createUser(data.data.name, data.data.email);

  // retornar os dados do usuário recém-criado
  res.status(201).json({ user: newUser });
};

export const useOTP : RequestHandler = async (req,res) => {
  //validar dados recebidos
  const data = authUseOTPSchema.safeParse(req.body);
if (!data.success) {
  res.json({ error: data.error.flatten().fieldErrors });
  return;
}

  //validar OTP
  const user = await validadteOTP(data.data.id, data.data.code);
  if (!user){
    res.json({error: 'otp invalido ou expirado'});
    return;
  }
  //criar JWT
  const token = createJWT(user.id);

  //retorna o jwt
  res.json ({token,user})

}