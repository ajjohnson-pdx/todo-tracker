import type { Employee, Note } from "../types";

const BASE = "http://localhost:8000";

export async function fetchNotes(employee?: Employee): Promise<Note[]> {
  const url = new URL(`${BASE}/notes`);
  if (employee) url.searchParams.set("employee", employee);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function createNote(title: string, body: string, employee: Employee): Promise<Note> {
  const res = await fetch(`${BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, employee }),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(
  id: number,
  data: { title?: string; body?: string; employee?: Employee }
): Promise<Note> {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${BASE}/notes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
}
