import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(@inject("CarsImagesRepository") private carsImagensRepository: ICarsImagesRepository ){}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImagensRepository.create(car_id, image);
        })
    }
}

export { UploadCarImagesUseCase }