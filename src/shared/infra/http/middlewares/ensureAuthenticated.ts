import { AppError } from "@shared/erros/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";



interface IPlayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const {sub: user_id} = verify(token, "9efb851725a5cafef78e3871cbeb9b93") as IPlayload;
        
        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id)

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id,
        }

        next();
    } catch{
        throw new AppError("Invalid token!", 401);
    }
}