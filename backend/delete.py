import pandas as pd
import os
import shutil
from datetime import datetime

CSV_PATH = "Sheet2.csv"
BACKUP_PATH = "Sheet2_backup.csv"

def reset_all_present():
    if not os.path.exists(CSV_PATH):
        return {"status": "error", "message": "CSV file not found"}

    # ✅ Create backup only if it doesn’t already exist
    if not os.path.exists(BACKUP_PATH):
        shutil.copy(CSV_PATH, BACKUP_PATH)

    df = pd.read_csv(CSV_PATH)

    # ✅ Reset columns (add if missing)
    for col in ["Present", "Food"]:
        if col not in df.columns:
            df[col] = ""
        else:
            df[col] = ""

    df.to_csv(CSV_PATH, index=False)

    return {
        "status": "success",
        "message": "All Present and Food marks have been cleared. Backup created once as Sheet2_backup.csv."
    }
