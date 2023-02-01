import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";


class ListAvailableCarsController { 
    async handle(request: Request, reponse: Response): Promise<Response> {
        const { brand, name, category_id } = request.body;

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

        const cars = await listAvailableCarsUseCase.execute({
            category_id: category_id as string,
            brand: brand as string,
            name: name as string,
        });

        return response.json(cars);
    }
}

export { ListAvailableCarsController }