import type { ReactNode } from "react";

interface TaskButtonProps {
	buttonName: string;
	icon: ReactNode;
	taskCount: number;
	onClick: () => void;
	isActive: boolean;
}

const TaskButton = ({
	buttonName,
	icon,
	taskCount,
	onClick,
	isActive,
}: TaskButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex w-full items-center justify-between rounded-2xl p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black	${isActive ? "bg-[#DDDDDD] font-semibold" : "bg-[#F4F4F4] hover:bg-[#EAEAEA]"}`}
			aria-current={isActive ? "page" : undefined}
		>
			<div className="flex min-w-0 items-center gap-4">
				<span className="shrink-0">
					{icon}
				</span>

				<span className="truncate">
					{buttonName}
				</span>
			</div>

			<span
				className={`shrink-0 rounded-full px-2 py-0.5 text-sm ${isActive ? "bg-white" : "bg-[#D8D6D6]"}`}
			>
				{taskCount}
			</span>
		</button>
	);
};

export default TaskButton;

