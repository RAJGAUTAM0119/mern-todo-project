"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";

import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu, GiSettingsKnobs } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import { TbRectangleFilled } from "react-icons/tb";
import { FaAngleDoubleRight } from "react-icons/fa";
import { PiListChecksBold } from "react-icons/pi";

import TaskButton from "@/src/components/ui/TaskButton";
import type { ActiveTask } from "@/src/app/dashboard/page";

interface MenuProps {
	activeTask: ActiveTask;
	onTaskChange: (task: ActiveTask) => void;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface MenuItem {
	name: ActiveTask;
	icon: ReactNode;
	taskCount: number;
}

const menuItems: MenuItem[] = [
	{
		name: "Today",
		icon: <PiListChecksBold />,
		taskCount: 2,
	},
	{
		name: "Upcoming",
		icon: <FaAngleDoubleRight />,
		taskCount: 3,
	},
	{
		name: "Sticky Notes",
		icon: <TbRectangleFilled />,
		taskCount: 5,
	},
];

const Menu = ({
	activeTask,
	onTaskChange,
	isOpen,
	setIsOpen,
}: MenuProps) => {
	const handleTaskChange = (task: ActiveTask) => {
		onTaskChange(task);

		// Close mobile menu after selecting an item.
		setIsOpen(false);
	};

	return (
		<aside className="w-full shrink-0 md:w-64 lg:w-72">
			{/* Mobile Header */}
			<div className="flex items-center justify-between border-b bg-[#F4F4F4] p-4 md:hidden">
				<h1 className="text-xl font-semibold text-gray-800">
					Menu
				</h1>

				<button
					type="button"
					onClick={() => setIsOpen((prev) => !prev)}
					className="rounded-lg p-2 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
					aria-label="Toggle menu"
					aria-expanded={isOpen}
				>
					<GiHamburgerMenu className="text-2xl text-black" />
				</button>
			</div>

			{/* Sidebar */}
			<div
				className={`
					${isOpen ? "flex" : "hidden"} flex-col gap-5 bg-[#F4F4F4] p-4 md:flex md:min-h-screen`}
			>
				{/* Desktop Header */}
				<div className="hidden items-center md:flex">
					<h1 className="text-2xl font-semibold text-gray-800">
						Menu
					</h1>
				</div>

				{/* Search */}
				<div className="flex w-full items-center gap-3 rounded-2xl border border-gray-300 bg-white px-3 py-2">
					<IoIosSearch className="shrink-0 text-xl text-gray-600" />

					<input
						type="search"
						placeholder="Search"
						className="min-w-0 flex-1 bg-transparent text-sm outline-none"
						aria-label="Search tasks"
					/>
				</div>

				{/* Navigation */}
				<nav className="flex flex-col gap-6">
					<div>
						<h2 className="mb-2 px-2 text-sm font-bold text-[#7C7C7C]">
							Tasks
						</h2>

						<div className="flex flex-col gap-2">
							{menuItems.map((item) => (
								<TaskButton
									key={item.name}
									buttonName={item.name}
									icon={item.icon}
									taskCount={item.taskCount}
									onClick={() =>
										handleTaskChange(item.name)
									}
									isActive={
										activeTask === item.name
									}
								/>
							))}
						</div>
					</div>
				</nav>

				{/* Bottom Actions */}
				<div className="mt-auto flex flex-col gap-2 border-t border-gray-200 pt-4">
					<button
						type="button"
						className="flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
					>
						<GiSettingsKnobs className="rotate-90 text-black" />

						<span>Settings</span>
					</button>

					<button
						type="button"
						className="flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
					>
						<FaSignOutAlt />

						<span>Sign out</span>
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Menu;

