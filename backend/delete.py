import pandas as pd
import os

CSV_PATH = "Sheet2.csv"

def reset_all_present():
    if not os.path.exists(CSV_PATH):
        return {"status": "error", "message": "CSV file not found"}

    df = pd.read_csv(CSV_PATH)

    if "Present" in df.columns:
        df["Present"] = ""
    else:
        df["Present"] = ""

    df.to_csv(CSV_PATH, index=False)

    return {"status": "success", "message": "All Present marks have been cleared"}
