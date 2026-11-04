"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Menu from "@/src/components/ui/Menu";
import Stickynotes from "@/src/components/todo/stickyNotes/Stickynotes";
import TodayTaskDashboard from "@/src/components/todo/todaysTask/TodayTask";
import UpcomingTask from "@/src/components/todo/upcomingTask/UpcomingTask";
import { tryRefreshToken } from "@/src/lib/api";
import Loader from "@/src/components/ui/Loader";

export type ActiveTask = "Today" | "Upcoming" | "Sticky Notes";

const Dashboard = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [activeTask, setActiveTask] = useState<ActiveTask>("Today");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      const token = window.localStorage.getItem("taskflow_access_token");
      if (token) {
        if (active) setIsChecking(false);
        return;
      }

      const refreshed = await tryRefreshToken();
      if (!active) return;

      if (refreshed) {
        setIsChecking(false);
      } else {
        router.replace("/login");
      }
    };

    void verifySession();
    return () => {
      active = false;
    };
  }, [router]);

  if (isChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-sm text-gray-500"><Loader /></div>
      </main>
    );
  }

  const dashboardViews = {
    "Today": <TodayTaskDashboard />,
    "Upcoming": <UpcomingTask />,
    "Sticky Notes": <Stickynotes />,
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:flex-row">
        <Menu activeTask={activeTask} onTaskChange={setActiveTask} isOpen={isOpen} setIsOpen={setIsOpen} />
        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {dashboardViews[activeTask]}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;