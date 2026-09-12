import TodayTaskSection from "./TodayTaskSection";

const TodayTaskDashboard = () => {
	return (
		<div className="flex min-h-full flex-col gap-6">
			{/* Header */}
			<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-sm font-medium text-gray-500">
						Tasks
					</p>

					<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
						Today
					</h1>
				</div>

				<button
					type="button"
					onClick={() => window.dispatchEvent(new Event("taskflow:add-task"))}
					className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:w-auto"
				>
					+ Add Task
				</button>
			</header>

			{/* Task Content */}
			<TodayTaskSection />
		</div>
	);

};

export default TodayTaskDashboard;