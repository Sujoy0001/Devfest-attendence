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


    stored_uid = str(df.at[actual_index, "Unique_id"]).strip()
    if stored_uid != unique_id.strip():
        return {"status": "error", "message": f"Unique ID mismatch. Expected {stored_uid}, got {unique_id}"}


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


def check_and_update_food(unique_id: str):
    if not os.path.exists(CSV_PATH):
        df = pd.DataFrame(columns=[
            "name", "email", "food_preference", "t_shirt_size",
            "Unique_id", "Qr_code", "Sent_status", "Present", "Food"
        ])
        df.to_csv(CSV_PATH, index=False)
        return {"status": "error", "message": "CSV file created but is empty"}

    df = pd.read_csv(CSV_PATH)

    # Ensure 'Food' column exists
    if "Food" not in df.columns:
        df["Food"] = ""

    # Extract row number from Unique ID
    num_match = re.findall(r'\d+', unique_id)
    if not num_match:
        return {"status": "error", "message": "Invalid Unique ID format"}

    row_num = int(num_match[0])
    actual_index = row_num - 1

    if actual_index < 0 or actual_index >= len(df):
        return {"status": "not_found", "message": "Unique ID out of range"}

    # Check UID match
    stored_uid = str(df.at[actual_index, "Unique_id"]).strip()
    if stored_uid != unique_id.strip():
        return {"status": "error", "message": f"Unique ID mismatch. Expected {stored_uid}, got {unique_id}"}

    # Check if present first
    present_status = str(df.at[actual_index, "Present"]).strip().lower()
    if present_status != "yes":
        return {"status": "error", "message": "Student not marked present yet"}

    # Check if food already marked done
    food_status = str(df.at[actual_index, "Food"]).strip().lower()
    if food_status == "done":
        student_data = df.loc[actual_index].replace({np.nan: None}).to_dict()
        student_data = {k: (v.item() if hasattr(v, "item") else v) for k, v in student_data.items()}
        return {"status": "already_done", "message": "Food already collected", "data": student_data}

    # Mark food as done
    df.at[actual_index, "Food"] = "Done"
    df.to_csv(CSV_PATH, index=False)

    student_data = df.loc[actual_index].replace({np.nan: None}).to_dict()
    student_data = {k: (v.item() if hasattr(v, "item") else v) for k, v in student_data.items()}

    return {"status": "done", "message": "Food collected successfully", "data": student_data}
