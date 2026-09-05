"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import LoginBanner from "@/public/sign-up.png";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // or use any icon library

type Inputs = {
	email: string;
	password: string;
	confirmPassword?: string;
};

const ZodFormSchema = z
	.object({
		email: z.email("Enter a valid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(20, "Password must be at most 20 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase, one lowercase, and one number",
			),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

const ZodSignupForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<Inputs>({
		resolver: zodResolver(ZodFormSchema),
		mode: "onSubmit",
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		// Handle signup logic here
	};

	const password = watch("password");

	// State for password visibility
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Toggle functions
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<section className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white">
			<div className="flex flex-col lg:flex-row gap-5 items-center justify-center w-full max-w-6xl">
				{/* Image Section - Hidden on mobile/tablet, 50% width on desktop */}
				<div className="hidden lg:flex relative w-[50%] h-[500px] xl:h-[550px] bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl items-center justify-center">
					<Image
						src={LoginBanner}
						alt="Sign up illustration"
						className="object-contain w-64 rotate-90"
						loading="eager"
						priority
					/>
					<div className="absolute top-6 md:top-8 left-6 md:left-8 z-10">
						<h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider drop-shadow-lg">
							Task Flow
						</h1>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
				</div>

				{/* Signup Form Section */}
				<div className="w-full lg:w-[50%] min-h-[550px] flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10">
					<div className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold self-start ml-0 sm:ml-4 md:ml-8 mb-6 sm:mb-8 md:mb-10 text-gray-800">
						Create Account
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full max-w-sm md:max-w-md gap-4 flex flex-col"
					>
						{/* Email Field */}
						<div>
							<div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-center gap-2 sm:gap-4">
								<label
									htmlFor="email"
									className="font-semibold text-sm sm:text-base text-gray-700"
								>
									Email
								</label>
								<input
									id="email"
									type="email"
									placeholder="Enter your email"
									className="w-full border border-gray-300 rounded-2xl outline-none pl-4 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:border-black transition-all duration-200"
									{...register("email")}
								/>
							</div>
							{errors.email && (
								<span className="text-red-500 text-xs sm:text-sm mt-1.5 block sm:ml-[116px]">
									{errors.email.message as string}
								</span>
							)}
						</div>

						{/* Password Field with Toggle */}
						<div>
							<div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-center gap-2 sm:gap-4">
								<label
									htmlFor="password"
									className="font-semibold text-sm sm:text-base text-gray-700"
								>
									Password
								</label>
								<div className="relative w-full">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Create a password"
										className="w-full border border-gray-300 rounded-2xl outline-none pl-4 pr-10 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:border-black transition-all duration-200"
										{...register("password")}
									/>
									{/* Toggle Button */}
									<button
										type="button"
										onClick={togglePasswordVisibility}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}
									>
										{showPassword ? (
											<Eye className="h-5 w-5" />
										) : (
											<EyeOff className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>
							{errors.password && (
								<span className="text-red-500 text-xs sm:text-sm mt-1.5 block sm:ml-[116px]">
									{errors.password.message as string}
								</span>
							)}
						</div>

						{/* Confirm Password Field with Toggle */}
						<div>
							<div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-center gap-2 sm:gap-4">
								<label
									htmlFor="confirmPassword"
									className="font-semibold text-sm sm:text-base text-gray-700"
								>
									Confirm Password
								</label>
								<div className="relative w-full">
									<input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirm your password"
										className="w-full border border-gray-300 rounded-2xl outline-none pl-4 pr-10 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:border-black transition-all duration-200"
										{...register("confirmPassword")}
									/>
									{/* Toggle Button */}
									<button
										type="button"
										onClick={toggleConfirmPasswordVisibility}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
										aria-label={
											showConfirmPassword ? "Hide password" : "Show password"
										}
									>
										{showConfirmPassword ? (
											<Eye className="h-5 w-5" />
										) : (
											<EyeOff className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>
							{errors.confirmPassword && (
								<span className="text-red-500 text-xs sm:text-sm mt-1.5 block sm:ml-[116px]">
									{errors.confirmPassword.message as string}
								</span>
							)}
						</div>

						{/* Password Requirements */}
						{password && (
							<div className="text-xs text-gray-600 sm:ml-[116px] space-y-1">
								<p
									className={
										password.length >= 8 ? "text-green-600" : "text-gray-500"
									}
								>
									✓ At least 8 characters
								</p>
								<p
									className={
										/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
											? "text-green-600"
											: "text-gray-500"
									}
								>
									✓ Contains uppercase, lowercase, and number
								</p>
							</div>
						)}

						{/* Sign Up Button */}
						<div className="flex items-center justify-center mt-2">
							<button
								className="bg-black rounded-3xl w-full sm:w-auto min-w-[140px] text-white font-semibold font-sans px-10 py-3 cursor-pointer hover:bg-gray-800 transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
								type="submit"
							>
								Create Account
							</button>
						</div>

						{/* Login Link */}
						<p className="text-center text-sm text-gray-600 mt-2">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-black font-semibold hover:underline transition-all duration-200"
							>
								Sign In
							</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ZodSignupForm;
