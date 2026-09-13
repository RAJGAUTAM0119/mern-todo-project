import Link from "next/link";

export default function Home() {
	return (
		<div className="px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-5">
			{/* Navbar */}
			<div className="flex justify-between items-center">
				<div className="text-lg sm:text-xl md:text-2xl font-semibold">
					Task Flow
				</div>
				<div>
					<Link href={"/dashboard"}>
						<button className="bg-black rounded-3xl px-3 py-1 sm:px-4 sm:py-1.5 cursor-pointer text-white font-bold text-sm sm:text-base">
							Dashboard
						</button>
					</Link>
				</div>
			</div>

			{/* Hero Section */}
			<div className="flex items-center justify-center flex-col text-center h-[60dvh] sm:h-[65dvh] md:h-[70dvh]">
				<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold linear py-2 sm:py-3">
					Organise Your Tasks
				</h2>
				<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold linear">
					Clean Your Mind
				</h2>
			</div>

			{/* CTA Button */}
			<div className="flex items-center justify-center">
				<Link href={"/login"}>
					<button className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans cursor-pointer bg-black text-white px-4 py-2 sm:px-5 sm:py-2 rounded-3xl">
						Get started
					</button>
				</Link>
			</div>

			{/* Todo Preview */}
			<div className="flex items-center justify-center h-[40dvh] sm:h-[45dvh] md:h-[50dvh] text-lg sm:text-xl md:text-2xl font-mono">
				todo preview
			</div>
		</div>
	);
}