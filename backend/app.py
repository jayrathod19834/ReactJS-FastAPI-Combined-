from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.login import login
from routes.users import userRoutes
from routes.company import companyRoutes
from routes.resetPassword import resetPass
from helpers import only_execute_once

origins = [
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

only_execute_once.initial_setup()

@app.get('/')
def index():
    return 'Hello'

app.include_router(login.router)
app.include_router(userRoutes.router)
app.include_router(companyRoutes.router)
app.include_router(resetPass.router)