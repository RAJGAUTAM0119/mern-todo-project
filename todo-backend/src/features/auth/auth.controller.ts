import { NextFunction, Request, Response } from "express";
import { loginUserService, refreshTokenService, registerUserService } from "./auth.service.ts";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {

	const { name, email, password } = req.body;
	const user = await registerUserService({ name, email, password });

	return res.status(200).json({
		success: true,
		message: "User Register succesfully",
		user,
	});

};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body
	const data = await loginUserService({ email, password })
	const { user, accessToken, refreshToken } = data

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000
	})

	return res.status(200).json({
		success: true,
		message: "User fetched successfully",
		user, accessToken
	})
}

export const getUserTodos = (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: "User fetched successfully",
		user: req.user
	})
}

export const accessTokenRotation = async (req: Request, res: Response) => {
	const refreshTokenCookie = req.cookies.refreshToken
	const accessToken = await refreshTokenService(refreshTokenCookie)
	res.status(200).json({
		success: true,
		message: "Cookie extracted successfully",
		accessToken
	})
}


export const auth = {
	registerUser, loginUser, getUserTodos, accessTokenRotation
};


