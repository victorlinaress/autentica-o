import { Request } from "express";

export type ExtendedRequest = Request & { 
    userId?: number;
};
 //adicionando a propriedade userId opcional para armazenar o ID do usuário.