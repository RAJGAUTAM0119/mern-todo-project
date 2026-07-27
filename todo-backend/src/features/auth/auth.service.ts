import { AppError } from "../../shared/errors/AppError.ts";
import { generateAccessToken, generateRefreshToken } from "../../shared/utils/jwt.utils.ts";
import { findUserByEmail, createUser, findUserByEmailWithPassword } from "./auth.repository.ts";
import { ILoginUserDTO } from "./dto/login-user.dto.ts";
import { RegisterUserDTO } from "./dto/register-user.dto.ts";
import bcrypt from 'bcrypt'

/**
 * @name registerUserService
 * @description A register user function which creates user in db
 * @param userData
 * @returns registered user
 */
export const registerUserService = async (userData: RegisterUserDTO) => {
	const { name, email, password } = userData;

	const isEmailAlreadyExistsServices = await findUserByEmail(email);
	if (isEmailAlreadyExistsServices) {
		throw new AppError(409, "User already exists");
	}

	return await createUser({ name, email, password });

};

/**
 * loginUserService is a functin which is helping to authenticate the existing user and helping the user to login easily
 * @param loginUser 
 * @returns user object
 */
export const loginUserService = async (loginUser: ILoginUserDTO) => {
	const user = await findUserByEmailWithPassword(loginUser.email)
	if (!user) {
		throw new AppError(404, "User is not found")
	}

	const isPasswordCorrect = await user.comparePassword(loginUser.password)
	if (!isPasswordCorrect) {
		throw new AppError(401, "Unauthorized")
	}

	const tokenFunctionArgument = { email: loginUser.email, role: user.role, userId: user._id }

	const accessToken = await generateAccessToken(tokenFunctionArgument)

	const refreshToken = await generateRefreshToken(tokenFunctionArgument)

	const data = { user, accessToken, refreshToken }

	return data
}