import { AppError } from "@shared/erros/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    });
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "321",
            email: "thales@thales.com",
            password: "123",
            name: "Thales",
        };
        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user", async () => {
        await expect( authenticateUserUseCase.execute({
                email: "false@hotmail.com",
                password: "123123",
            })
        ).rejects.toEqual(new AppError("Email or Password incorrect!"))
    });

  it("Should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "User Test Error",
    };
    
    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrectPassword",
    })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"))
  })
});