import { useEffect } from "react";
import { fetchDueTasks, updateTask } from "../api/tasks";

export default function ReminderPoller() {
  useEffect(() => {
    // Request notification permission once
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    async function checkReminders() {
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      try {
        const dueTasks = await fetchDueTasks();
        for (const task of dueTasks) {
          new Notification("Todo Reminder", {
            body: task.title,
            icon: "/favicon.ico",
          });
          await updateTask(task.id, { reminder_fired: true });
        }
      } catch {
        // Silently ignore polling errors (backend may be temporarily unavailable)
      }
    }

    checkReminders();
    const interval = setInterval(checkReminders, 60_000);

    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        checkReminders();
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
