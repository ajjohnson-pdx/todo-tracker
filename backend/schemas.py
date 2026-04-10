from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel

EMPLOYEES = ["Murat", "Matias", "Nick", "Brian", "Ethan", "Jenny", "Dee"]
EmployeeName = Literal["Murat", "Matias", "Nick", "Brian", "Ethan", "Jenny", "Dee"]


# --- Task schemas ---

class TaskCreate(BaseModel):
    title: str
    reminder_at: Optional[datetime] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
    reminder_at: Optional[datetime] = None
    reminder_fired: Optional[bool] = None


class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool
    reminder_at: Optional[datetime]
    reminder_fired: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# --- Note schemas ---

class NoteCreate(BaseModel):
    title: str
    body: str
    employee: EmployeeName


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    employee: Optional[EmployeeName] = None


class NoteResponse(BaseModel):
    id: int
    title: str
    body: str
    employee: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
