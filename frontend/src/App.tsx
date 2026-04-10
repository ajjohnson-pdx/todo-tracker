import { useState } from "react";
import NoteList from "./components/NoteList";
import ReminderPoller from "./components/ReminderPoller";
import TaskList from "./components/TaskList";

type Tab = "tasks" | "notes";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("tasks");

  return (
    <div className="min-h-screen bg-gray-50">
      <ReminderPoller />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Todo Tracker</h1>

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 mb-6">
          {(["tasks", "notes"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "tasks" ? <TaskList /> : <NoteList />}
      </div>
    </div>
  );
}
