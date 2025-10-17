from pydantic import BaseModel

class IdRequest(BaseModel):
    unique_id: str
