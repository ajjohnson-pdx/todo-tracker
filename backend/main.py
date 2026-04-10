from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import tasks, notes

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(notes.router)


@app.get("/")
def root():
    return {"status": "ok"}
