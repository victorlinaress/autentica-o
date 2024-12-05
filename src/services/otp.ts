import { v4 as uuid } from 'uuid';
import { prisma } from "../libs/prisma";
// gerar otp
export const generateOTP = async (userId: number) => {
    let otpArray: number[] = []; //gerar numeros
    for (let q = 0; q < 6; q++) {
        otpArray.push(Math.floor(Math.random() * 9));
    }

    let code = otpArray.join(''); //pegar array
    let expiresAt = new Date(); //data de expricação
    expiresAt.setMinutes(expiresAt.getMinutes() + 30); //adicionar 30

     const otp = await prisma.oTP.create({ 
        data: {
            id: uuid(),
            code,
            userId,
            expiresAt
        }
    });
    return otp;
};

//validar otp

export const validadteOTP = async (id: string, code: string) => {
     const otp = await prisma.oTP.findFirst({
        select: {
            user: true
        },
        where:{
            id,code,
            expiresAt:{
                gt: new Date()
            },
            used: false
        }
     });

     if (otp && otp.user) {
        await prisma.oTP.update({
          where: { id },
          data: { used: true },
        });
        return otp.user;
      }
      
      return false;
      }
      