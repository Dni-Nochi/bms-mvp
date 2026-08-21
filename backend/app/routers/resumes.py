from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Resume
from app.schemas import ResumeCreate, ResumeOut

router = APIRouter(prefix="/api/resumes", tags=["resumes"])


@router.get("", response_model=list[ResumeOut])
def list_resumes(db: Session = Depends(get_db)):
    return list(db.execute(select(Resume)).scalars().all())


@router.get("/{resume_id}", response_model=ResumeOut)
def get_resume(resume_id: int, db: Session = Depends(get_db)):
    resume = db.get(Resume, resume_id)
    if resume is None:
        raise HTTPException(status_code=404, detail="Резюме не найдено")
    return resume


@router.post("", response_model=ResumeOut, status_code=201)
def create_resume(payload: ResumeCreate, db: Session = Depends(get_db)):
    resume = Resume(**payload.model_dump())
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume
