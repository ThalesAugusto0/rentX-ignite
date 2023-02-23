import { Request, Response } from "express";
import { ProfileUserUseCase } from "./ProfileUserUseCase";
import { container } from "tsyringe";


class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const profileUserUseCase = container.resolve(ProfileUserUseCase)

        const user = await profileUserUseCase.execute(id);

        return response.json(user);
    }
}

export { ProfileUserController }