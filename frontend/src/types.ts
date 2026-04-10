export type Employee = "Murat" | "Matias" | "Nick" | "Brian" | "Ethan" | "Jenny" | "Dee";

export const EMPLOYEES: Employee[] = ["Murat", "Matias", "Nick", "Brian", "Ethan", "Jenny", "Dee"];

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  reminder_at: string | null;
  reminder_fired: boolean;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: number;
  title: string;
  body: string;
  employee: Employee;
  created_at: string;
  updated_at: string;
}
