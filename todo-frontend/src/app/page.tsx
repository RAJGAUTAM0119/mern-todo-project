import Link from "next/link";

export default function Home() {
	return (
		<div className="px-20 py-5">
			<div className="flex justify-between items-center ">
				<div className="text-2xl font-semibold">Task Flow</div>
				<div>
					<Link href={"/dashboard"}>
						<button className="bg-black rounded-3xl px-3 py-1 cursor-pointer text-white font-bold ">
							Dashboard
						</button>
					</Link>
				</div>
			</div>
			<div className="flex items-center justify-center flex-col h-[70dvh]">
				<h2 className="text-6xl font-bold linear py-3">Organise Your Tasks</h2>
				<h2 className="text-6xl font-bold linear">Clean Your Mind</h2>
			</div>
			<div className="flex items-center justify-center">
				<Link href={"/login"}>
					<button className="text-2xl font-sans cursor-pointer bg-black text-white px-5 py-2 rounded-3xl">
						Get started
					</button>
				</Link>
			</div>
			<div className="flex items-center justify-center h-[50dvh] text-2xl font-mono">
				todo preview
			</div>
		</div>
	);
}
