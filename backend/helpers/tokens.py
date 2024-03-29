from jose import jwt
from datetime import datetime, timedelta
from http import HTTPStatus
from fastapi import HTTPException
from config import logError

SECRET_KEY = 'b3a94dceab794d6f6d57f711096c7fbd4083d6fcb44209f7be5458e373d9ce79'

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    try:
        token = jwt.encode(to_encode,SECRET_KEY)
        return token
    except:
        raise HTTPException(status_code = HTTPStatus.NOT_ACCEPTABLE, detail = logError.TOKEN_INVALID)

def decode_access_token(token: str):
    try:
        return jwt.decode(token,SECRET_KEY)
    except:
        raise HTTPException(status_code = HTTPStatus.NOT_ACCEPTABLE,detail = logError.TOKEN_INVALID)