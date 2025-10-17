from fastapi import FastAPI
from fastapi.responses import FileResponse
from models import IdRequest
from utils import check_and_update
from delete import reset_all_present
import os

app = FastAPI(title="CSV Unique ID Checker")

CSV_PATH = "Sheet2.csv"

@app.get("/")
def index():
    return {"massage" : "This code is working..."}

@app.post("/check_id")
def check_unique_id(request: IdRequest):
    result = check_and_update(request.unique_id.strip())
    return result


@app.get("/download_csv")
def download_csv():
    if os.path.exists(CSV_PATH):
        return FileResponse(
            path=CSV_PATH,
            filename="attendance.csv",
            media_type="text/csv"
        )
    else:
        return {"status": "error", "message": "CSV file not found"}
    
@app.post("/reset_present")
def reset_present():
    return reset_all_present()