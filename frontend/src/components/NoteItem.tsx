import { useState } from "react";
import type { Employee, Note } from "../types";
import EditNoteModal from "./EditNoteModal";

interface Props {
  note: Note;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, title: string, body: string, employee: Employee) => Promise<void>;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const EMPLOYEE_COLORS: Record<string, string> = {
  Murat: "bg-purple-100 text-purple-700",
  Matias: "bg-blue-100 text-blue-700",
  Nick: "bg-green-100 text-green-700",
  Brian: "bg-yellow-100 text-yellow-700",
  Ethan: "bg-orange-100 text-orange-700",
  Jenny: "bg-pink-100 text-pink-700",
  Dee: "bg-teal-100 text-teal-700",
};

export default function NoteItem({ note, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const colorClass = EMPLOYEE_COLORS[note.employee] ?? "bg-gray-100 text-gray-700";

  return (
    <>
      <div
        onClick={() => setEditing(true)}
        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow group relative"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-gray-800 flex-1">{note.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-sm transition-opacity flex-shrink-0"
            title="Delete note"
          >
            🗑
          </button>
        </div>
        <p className="text-sm text-gray-600 whitespace-pre-wrap mb-3">{note.body}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
            {note.employee}
          </span>
          <span className="text-xs text-gray-400">{formatDate(note.updated_at)}</span>
        </div>
      </div>
      {editing && (
        <EditNoteModal
          note={note}
          onClose={() => setEditing(false)}
          onSubmit={async (id, title, body, employee) => {
            await onEdit(id, title, body, employee);
          }}
        />
      )}
    </>
  );
}
