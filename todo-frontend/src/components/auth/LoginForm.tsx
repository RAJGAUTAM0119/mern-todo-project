"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import LoginBanner from "@/public/sign-up.png";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
	[data: string]: unknown;
};

const ZodFormSchema = z.object({
	email: z.email("Enter Valid Email"),
	password: z
		.string("Not a string")
		.min(3, "minimum length should be 3")
		.max(20, "maximum length should be 20"),
	// confirmPassword: z.string(),
});
// .refine((data) => data.password == data.confirmPassword, {
// 	message: "Password Doesn't match",
// 	path: ["confirmPassword"],
// });

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
		<section className="flex items-center justify-center">
			<div className="bg-white flex gap-5 items-center justify-center">
				<div className="bg-black rounded-3xl flex flex-1 items-center justify-center">
					{" "}
					<Image
						src={LoginBanner}
						alt="Login Banner"
						className="w-75 flex rotate-90"
						loading="eager"
					/>
				</div>
				<div className="w-[35dvw] h-[90dvh] flex flex-1 flex-col items-center justify-center  border rounded-3xl border-gray-200 	">
					<div className="text-4xl font-sans font-bold self-start ml-23 mb-10">
						Login
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-70	 gap-4 flex flex-col"
					>
						<div>
							<div className="flex gap-4 items-center justify-between">
								<label htmlFor="email" className="font-semibold ">
									Email
								</label>
								<input
									id="email"
									type="email"
									placeholder={"Email"}
									className="border border-black rounded-2xl outline-none pl-1"
									{...register("email")}
								/>
							</div>
							<div>{errors.email && <span>{errors.email.message}</span>}</div>
						</div>
						<div>
							<div className="flex gap-4 items-center justify-between">
								<label htmlFor="password" className="font-semibold ">
									Password
								</label>
								<input
									id="password"
									type="password"
									placeholder={"password"}
									className="border border-black rounded-2xl outline-none pl-1"
									{...register("password")}
								/>
							</div>
							<div>
								{errors.password && <span>{errors.password.message}</span>}
							</div>
						</div>
						{/* <div>
							<div className="flex gap-4 items-center justify-between">
								<label htmlFor="confirmPassword" className="font-semibold ">
									Confirm Password
								</label>
								<input
									id="confirmPassword"
									type="password"
									placeholder={"confirmPassword"}
									className="border border-black rounded-2xl outline-none pl-1"
									{...register("confirmPassword")}
								/>
							</div>
							<div>
								{errors.confirmPassword && (
									<span>{errors.confirmPassword.message}</span>
								)}
							</div>
						</div> */}
						<div className="flex items-center justify-center">
							<button
								className="bg-black rounded-3xl w-auto text-white font-bold font-sans my-5 px-4 py-2 cursor-pointer"
								type="submit"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ZodLoginForm;
