import { prisma } from "../libs/prisma"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {email}
    });
    return user


}

export const getUserById = async (id: number) => {
    const user = await prisma.user.findFirst({
        where: {id}
    });
    return user


}

export const createUser = async(name:string, email: string) => {
    const user = await prisma.user.create({
        data: {name, email}
    })
    return user;
}