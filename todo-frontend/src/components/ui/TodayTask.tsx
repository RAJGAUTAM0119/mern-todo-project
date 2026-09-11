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
					className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:w-auto"
				>
					+ Add Task
				</button>
			</header>

			{/* Task Content */}
			<section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
				{/* Tasks */}
				<div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
					<div className="mb-5">
						<h2 className="text-lg font-semibold text-gray-900">
							{`Today's Tasks`}
						</h2>

						<p className="text-sm text-gray-500">
							2 tasks remaining
						</p>
					</div>

					{/* Task components will go here */}
					<div className="flex flex-col gap-3">
						{/* <TaskItem /> */}
					</div>
				</div>

				{/* Summary */}
				<aside className="rounded-2xl border border-gray-200 bg-[#F4F4F4] p-4 sm:p-6">
					<h2 className="mb-4 text-lg font-semibold text-gray-900">
						Summary
					</h2>

					<div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
						<div className="rounded-xl bg-white p-4">
							<p className="text-sm text-gray-500">
								Completed
							</p>

							<p className="mt-1 text-2xl font-bold text-gray-900">
								5
							</p>
						</div>

						<div className="rounded-xl bg-white p-4">
							<p className="text-sm text-gray-500">
								Remaining
							</p>

							<p className="mt-1 text-2xl font-bold text-gray-900">
								2
							</p>
						</div>
					</div>
				</aside>
			</section>
		</div>
	);

};

export default TodayTaskDashboard;