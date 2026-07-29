import dotenv from "dotenv";
dotenv.config();
import type { StringValue } from "ms";

/**
 * @name getEnvVariables
 * @description this function checks is environment variable exist or not if not then give error if exist then return is value
 * @param key is environment variable
 * @returns environment variable
 */
const getEnvVariables = (key: string) => {
	const envValue = process.env[key];
	if (!envValue) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return envValue;
};

export const env = {
	PORT: Number(getEnvVariables("PORT")),
	MONGODB_URI: getEnvVariables("MONGODB_URI"),
	ACCESS_TOKEN_SECRET: getEnvVariables("ACCESS_TOKEN_SECRET"),
	ACCESS_TOKEN_EXPIRY: getEnvVariables("ACCESS_TOKEN_EXPIRY") as StringValue,
	REFRESH_TOKEN_SECRET: getEnvVariables("REFRESH_TOKEN_SECRET"),
	REFRESH_TOKEN_EXPIRY: getEnvVariables("REFRESH_TOKEN_EXPIRY") as StringValue,
};
