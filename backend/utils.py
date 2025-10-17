import pandas as pd
import re
import os
import numpy as np

CSV_PATH = "Sheet2.csv"

def check_and_update(unique_id: str):
    if not os.path.exists(CSV_PATH):
        df = pd.DataFrame(columns=[
            "name", "email", "food_preference", "t_shirt_size",
            "Unique_id", "Qr_code", "Sent_status", "Present"
        ])
        df.to_csv(CSV_PATH, index=False)
        return {"status": "error", "message": "CSV file created but is empty"}

    df = pd.read_csv(CSV_PATH)

    if "Present" not in df.columns:
        df["Present"] = ""

    num_match = re.findall(r'\d+', unique_id)
    if not num_match:
        return {"status": "error", "message": "Invalid Unique ID format"}

    row_num = int(num_match[0])  
    actual_index = row_num - 1   

    if actual_index < 0 or actual_index >= len(df):
        return {"status": "not_found", "message": "Unique ID out of range"}

    already_present = str(df.at[actual_index, "Present"]).strip().lower() == "yes"
    if already_present:
        student_data = df.loc[actual_index].replace({np.nan: None}).to_dict()
        student_data = {k: (v.item() if hasattr(v, "item") else v) for k, v in student_data.items()}
        return {"status": "already_present", "message": "Student is already marked present", "data": student_data}

    df.at[actual_index, "Present"] = "Yes"
    df.to_csv(CSV_PATH, index=False)

    student_data = df.loc[actual_index].replace({np.nan: None}).to_dict()
    student_data = {k: (v.item() if hasattr(v, "item") else v) for k, v in student_data.items()}

    return {"status": "found", "data": student_data}
