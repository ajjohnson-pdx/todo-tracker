import { useCallback, useEffect, useState } from "react";
import { createNote, deleteNote, fetchNotes, updateNote } from "../api/notes";
import { EMPLOYEES } from "../types";
import type { Employee, Note } from "../types";
import AddNoteModal from "./AddNoteModal";
import NoteItem from "./NoteItem";

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filterEmployee, setFilterEmployee] = useState<Employee | "">("");
  const [showAddModal, setShowAddModal] = useState(false);

  const loadNotes = useCallback(async () => {
    const data = await fetchNotes(filterEmployee || undefined);
    setNotes(data);
  }, [filterEmployee]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  async function handleAdd(body: string, employee: Employee) {
    await createNote(body, employee);
    await loadNotes();
  }

  async function handleDelete(id: number) {
    await deleteNote(id);
    await loadNotes();
  }

  async function handleEdit(id: number, body: string, employee: Employee) {
    await updateNote(id, { body, employee });
    await loadNotes();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <select
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(e.target.value as Employee | "")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All employees</option>
          {EMPLOYEES.map((emp) => (
            <option key={emp} value={emp}>{emp}</option>
          ))}
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Note
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-12">
          {filterEmployee ? `No notes for ${filterEmployee} yet.` : "No notes yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddNoteModal onClose={() => setShowAddModal(false)} onSubmit={handleAdd} />
      )}
    </div>
  );
}
