import TodayTaskSection from '../todaysTask/TodayTaskSection'

const UpcomingTask = () => {
  return (
    <div className="flex flex-col gap-6">
      <header><p className="text-sm font-medium text-gray-500">Tasks</p><h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Upcoming</h1></header>
      <TodayTaskSection mode="upcoming" />

    </div>
  )
}

export default UpcomingTask