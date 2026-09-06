import { ReactNode } from "react";

interface IProps {
	ButtonName: string;
	Icons: ReactNode;
	NumberOfTasks: number;
	ClickFunc: () => void;
	IsActive: boolean;
}

const TaskButton = ({
	ButtonName,
	Icons,
	NumberOfTasks,
	ClickFunc,
	IsActive,
}: IProps) => {
	return (
		<div
			className={`flex items-center justify-between p-1 rounded-2xl cursor-pointer ${
				IsActive ? "bg-[#dddddd] font-semibold" : "bg-[#F4F4F4]"
			}`}
			onClick={ClickFunc}
		>
			<div className="flex gap-4 items-center">
				<div>{Icons}</div>

				<div>{ButtonName}</div>
			</div>

			<div>
				<div
					className={`rounded-3 px-2 ${IsActive ? "bg-white" : "bg-[#d8d6d6]"}`}
				>
					{NumberOfTasks}
				</div>
			</div>
		</div>
	);
};

export default TaskButton;
