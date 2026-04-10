import type { Task } from "../types";

const BASE = "http://localhost:8000";

export async function fetchTasks(completed?: boolean): Promise<Task[]> {
  const url = new URL(`${BASE}/tasks`);
  if (completed !== undefined) url.searchParams.set("completed", String(completed));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function fetchDueTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}/tasks/due`);
  if (!res.ok) throw new Error("Failed to fetch due tasks");
  return res.json();
}

export async function createTask(title: string, reminder_at?: string): Promise<Task> {
  const res = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, reminder_at: reminder_at ?? null }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id: number, data: Partial<Omit<Task, "id" | "created_at">>): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
