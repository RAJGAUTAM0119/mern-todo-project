import Image from "next/image";
import Login from "./login/page";

export default function Home() {
	return (
		<div className="px-20 py-5">
			<div className="flex justify-between items-center ">
				<div>Task Flow</div>
				<div>
					<button className="bg-blue-400 rounded-3xl px-3 py-1 cursor-pointer text-[#000000] font-bold hover:size-16">
						Login
					</button>
				</div>
			</div>
			<div>
				<h2>Organise Your Code</h2>
				<h2>Clean Your Mind</h2>
			</div>
			<div>
				<button>Get started</button>
			</div>
			<div>todo preview</div>
		</div>
	);
}
