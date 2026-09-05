"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import LoginBanner from "@/public/sign-up.png";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

type Inputs = {
	[data: string]: unknown;
};

const ZodFormSchema = z.object({
	email: z.email("Enter Valid Email"),
	password: z
		.string("Not a string")
		.min(3, "minimum length should be 3")
		.max(20, "maximum length should be 20"),
});

const ZodLoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(ZodFormSchema),
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<section className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white">
			<div className="flex flex-col lg:flex-row gap-5 items-center justify-center w-full max-w-6xl">
				{/* Image Section - Hidden on mobile/tablet, 40% width on desktop */}
				<div className="hidden lg:flex relative w-[50%] h-[500px] xl:h-[550px] bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl items-center justify-center">
					{/* <div className="flex justify-center place-items-center-safe"> */}
					<Image
						src={LoginBanner}
						alt="Login Banner"
						className="object-contain w-64  rotate-90"
						loading="eager"
						priority
						style={{ objectPosition: "center" }}
					/>
					{/* </div> */}
					{/* Task Flow Logo - Top Left */}
					<div className="absolute top-6 md:top-8 left-6 md:left-8">
						<h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider drop-shadow-lg">
							Task Flow
						</h1>
					</div>
					{/* Subtle overlay for better text readability */}
					<div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20" />
				</div>

				{/* Login Form Section - Full width on mobile/tablet, 60% on desktop */}
				<div className="w-full lg:w-[50%] h-[550px] sm:min-h-[450px] md:min-h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10">
					<div className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold self-start ml-0 sm:ml-4 md:ml-8 mb-6 sm:mb-8 md:mb-10 text-gray-800">
						Welcome Back
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full max-w-sm md:max-w-md gap-5 flex flex-col"
					>
						{/* Email Field */}
						<div>
							<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
								<label
									htmlFor="email"
									className="font-semibold text-sm sm:text-base text-gray-700 min-w-[70px] sm:min-w-[80px]"
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
								<span className="text-red-500 text-xs sm:text-sm mt-1.5 block ml-0 sm:ml-[84px] md:ml-[94px]">
									{errors.email.message as string}
								</span>
							)}
						</div>

						{/* Password Field */}
						<div>
							<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
								<label
									htmlFor="password"
									className="font-semibold text-sm sm:text-base text-gray-700 min-w-[70px] sm:min-w-[80px]"
								>
									Password
								</label>
								<input
									id="password"
									type="password"
									placeholder="Enter your password"
									className="w-full border border-gray-300 rounded-2xl outline-none pl-4 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:border-black transition-all duration-200"
									{...register("password")}
								/>
							</div>
							{errors.password && (
								<span className="text-red-500 text-xs sm:text-sm mt-1.5 block ml-0 sm:ml-[84px] md:ml-[94px]">
									{errors.password.message as string}
								</span>
							)}
						</div>

						{/* Forgot Password Link */}
						<div className="text-right">
							<Link
								href="#"
								className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
							>
								Forgot password?
							</Link>
						</div>

						{/* Login Button */}
						<div className="flex items-center justify-center mt-2">
							<button
								className="bg-black rounded-3xl w-full sm:w-auto min-w-[140px] text-white font-semibold font-sans px-10 py-3 cursor-pointer hover:bg-gray-800 transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg"
								type="submit"
							>
								Login
							</button>
						</div>

						{/* Sign Up Link */}
						<p className="text-center text-sm text-gray-600 mt-2">
							{`Don't have an account? `}
							<Link
								href="#"
								className="text-black font-semibold hover:underline"
							>
								Sign Up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ZodLoginForm;
