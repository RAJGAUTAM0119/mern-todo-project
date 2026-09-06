interface IProps {
	ButtonName: string;
	Color: string;
	NumberOfTasks: number;
	ClickFunc: () => void;
	IsActive: boolean;
}

const Lists = ({
	ButtonName,
	Color,
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
				<div className={`w-3 h-3  rounded-2xl bg-${Color}`}></div>

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

export default Lists;
