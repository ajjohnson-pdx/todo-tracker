import { useState } from "react";
import type { Task } from "../types";
import EditTaskModal from "./EditTaskModal";

interface Props {
  task: Task;
  onComplete: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, title: string, reminderAt?: string) => Promise<void>;
}

function formatReminder(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TaskItem({ task, onComplete, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const isPastDue = task.reminder_at && !task.reminder_fired && new Date(task.reminder_at) < new Date();

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group rounded-lg">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task.id)}
          className="w-4 h-4 rounded accent-blue-600 cursor-pointer flex-shrink-0"
        />
        <span
          onClick={() => setEditing(true)}
          className={`flex-1 text-sm cursor-pointer ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {task.title}
        </span>
        {task.reminder_at && (
          <span
            className={`text-xs flex items-center gap-1 flex-shrink-0 ${
              isPastDue ? "text-red-500 font-medium" : "text-gray-400"
            }`}
          >
            🔔 {formatReminder(task.reminder_at)}
          </span>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-sm flex-shrink-0 transition-opacity"
          title="Delete task"
        >
          🗑
        </button>
      </div>
      {editing && (
        <EditTaskModal
          task={task}
          onClose={() => setEditing(false)}
          onSubmit={async (id, title, reminderAt) => {
            await onEdit(id, title, reminderAt);
          }}
        />
      )}
    </>
  );
}
