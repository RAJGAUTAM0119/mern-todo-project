"use client";

import { useState } from "react";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	console.log(email);
	console.log(password);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<section className="w-dvw h-dvh flex flex-col items-center justify-center bg-red-500">
			<div className="w-50dvw h-50dvh flex flex-col items-center justify-center bg-blue-500">
				<div className="text-4xl font-sans font-bold flex- items-start justify-center">
					Login
				</div>
				<form className="flex flex-col gap-3">
					<div className="flex gap-4">
						<label htmlFor="email" className="font-semibold text-2xl">
							Email
						</label>
						<input
							id="email"
							placeholder={"Your email"}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex gap-4">
						<label htmlFor="password" className="font-semibold text-2xl">
							Password
						</label>
						<input
							id="password"
							placeholder={"Your password"}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="flex items-center justify-center">
						<button
							className="bg-black rounded-3xl w-auto text-white font-bold font-sans px-4 py-2"
							onSubmit={handleSubmit}
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default LoginForm;
