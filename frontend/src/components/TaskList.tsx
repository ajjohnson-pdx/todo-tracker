import { useCallback, useEffect, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api/tasks";
import type { Task } from "../types";
import AddTaskModal from "./AddTaskModal";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadTasks = useCallback(async () => {
    const data = await fetchTasks(showCompleted ? true : false);
    setTasks(data);
  }, [showCompleted]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleAdd(title: string, reminderAt?: string) {
    // Convert local datetime string to ISO UTC string
    const isoReminder = reminderAt ? new Date(reminderAt).toISOString() : undefined;
    await createTask(title, isoReminder);
    await loadTasks();
  }

  async function handleComplete(id: number) {
    await updateTask(id, { completed: true });
    await loadTasks();
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    await loadTasks();
  }

  async function handleEdit(id: number, title: string, reminderAt?: string) {
    const isoReminder = reminderAt ? new Date(reminderAt).toISOString() : null;
    await updateTask(id, { title, reminder_at: isoReminder ?? undefined, reminder_fired: false });
    await loadTasks();
  }

  async function handleRestore(id: number) {
    await updateTask(id, { completed: false });
    await loadTasks();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setShowCompleted(false)}
            className={`px-3 py-1.5 text-sm rounded-full font-medium transition-colors ${
              !showCompleted ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setShowCompleted(true)}
            className={`px-3 py-1.5 text-sm rounded-full font-medium transition-colors ${
              showCompleted ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Task
        </button>
      </div>

      <div className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-12">
            {showCompleted ? "No completed tasks yet." : "No tasks — you're all caught up!"}
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={showCompleted ? handleRestore : handleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {showAddModal && (
        <AddTaskModal onClose={() => setShowAddModal(false)} onSubmit={handleAdd} />
      )}
    </div>
  );
}
