import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/erros/AppError";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        email: string;
        name: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}
    
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Email or Password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Email or Password incorrect!");
        }

        const token = sign({}, "9efb851725a5cafef78e3871cbeb9b93", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase };