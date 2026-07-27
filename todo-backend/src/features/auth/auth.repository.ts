import { Types } from "mongoose";
import { RegisterUserDTO } from "./dto/register-user.dto.ts";
import { userModel } from "./user.model.ts";

/**
 * @name findUserByEmail
 * @description check if email already exist or not if not then skip if yes then return null
 * @param email
 * @returns user | null
 */
export const findUserByEmail = async (email: string) => {
	return await userModel.findOne({ email });
};

/**
 * @name createUser
 * @description the repository function which creates user and returns it
 * @param userData
 * @returns user
 */
export const createUser = async (userData: RegisterUserDTO) => {
	const { name, email, password } = userData;
	return await userModel.create({ name, email, password });
};


export const findUserByEmailWithPassword = async (email: string) => {
	return await userModel.findOne({ email }).select("+password")
}

export const findUserById = async (id: Types.ObjectId) => {
	return await userModel.findById(id)
}