"use client";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaListCheck } from "react-icons/fa6";
import { TbRectangleFilled } from "react-icons/tb";
import { FaAngleDoubleRight } from "react-icons/fa";
import TaskButton from "@/src/components/ui/TaskButton";
import { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import Lists from "@/src/components/ui/Lists";

const Dashboard = () => {
	const [activeTask, setActiveTask] = useState("Upcoming");
	return (
		<section className="py-7 px-12">
			{/* menu div */}
			<div className=" w-[20%] flex flex-col gap-3 bg-[#F4F4F4] p-3">
				{/* menu and hamberger */}
				<div className="w-full flex justify-between items-center">
					<div className="text-2xl font-semibold text-gray-800">Menu</div>
					<GiHamburgerMenu className="cursor-pointer text-black font-bold text-3xl lg:hidden" />
				</div>

				{/* search div */}
				<div className="w-full flex gap-5 items-center py-1 px-2 border border-gray-900 rounded-2xl">
					<IoIosSearch className="block" />
					<input type="text" placeholder="Search" className="outline-none" />
				</div>

				{/* operational div */}
				<div>
					<div className="text-sm font-bold text-[#7C7C7C] p-2">Tasks</div>
					{/* Tasks */}
					<div className="flex flex-col gap-3">
						{/* Each buttons */}

						<TaskButton
							ButtonName="Upcoming"
							Icons={<FaAngleDoubleRight />}
							NumberOfTasks={3}
							ClickFunc={() => setActiveTask("Upcoming")}
							IsActive={activeTask === "Upcoming"}
						/>

						<TaskButton
							ButtonName="Today"
							Icons={<FaListCheck />}
							NumberOfTasks={2}
							ClickFunc={() => setActiveTask("Today")}
							IsActive={activeTask === "Today"}
						/>

						<TaskButton
							ButtonName="Sticky Notes"
							Icons={<TbRectangleFilled />}
							NumberOfTasks={5}
							ClickFunc={() => setActiveTask("Sticky Notes")}
							IsActive={activeTask === "Sticky Notes"}
						/>
					</div>

					{/* Lists */}
					<div className="text-sm font-bold text-[#7C7C7C] p-2">Lists</div>
					<div className="flex flex-col gap-3">
						<Lists
							ButtonName="Personal"
							Color="red-400"
							NumberOfTasks={4}
							ClickFunc={() => {
								setActiveTask("Personal");
							}}
							IsActive={activeTask === "Personal"}
						/>
					</div>

					{/* Settings and logout */}
					<div>
						<div className="flex gap-3 items-center ">
							<GiSettingsKnobs className="text-black rotate-90" />
							<div>Settings</div>
						</div>
						<div className="flex gap-3 items-center ">
							<FaSignOutAlt />
							<div>Sign out</div>
						</div>
					</div>
				</div>
			</div>

			{/* dashboard div */}
			<div>
				{/* Today's div and the content change according to the operational div */}
				<div></div>

				{/* div to add new tasks */}
				<div></div>

				{/* Rendered tasks and remaining tasks */}
				<div></div>
			</div>
		</section>
	);
};

export default Dashboard;
