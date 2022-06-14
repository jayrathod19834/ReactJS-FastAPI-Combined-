from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

engine = create_engine('mysql+mysqldb://root:password@localhost/alex', pool_pre_ping=True)
Base = declarative_base()
session = Session(bind = engine)

def get_db():
    db = session
    try:
        yield db
    finally:
        db.close()