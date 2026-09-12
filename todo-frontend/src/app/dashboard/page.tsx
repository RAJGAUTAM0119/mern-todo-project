
"use client";

import { useState } from "react";

import Menu from "@/src/components/ui/Menu";
import Stickynotes from "@/src/components/todo/stickyNotes/Stickynotes";
import TodayTaskDashboard from "@/src/components/todo/todaysTask/TodayTask";
import UpcomingTask from "@/src/components/todo/upcomingTask/UpcomingTask";

export type ActiveTask = "Today" | "Upcoming" | "Sticky Notes";

const Dashboard = () => {
  const [activeTask, setActiveTask] =
    useState<ActiveTask>("Today");

  const [isOpen, setIsOpen] = useState(false);

  const dashboardViews = {
    "Today": <TodayTaskDashboard />,
    "Upcoming": <UpcomingTask />,
    "Sticky Notes": <Stickynotes />,
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:flex-row">
        <Menu
          activeTask={activeTask}
          onTaskChange={setActiveTask}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {dashboardViews[activeTask]}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;

