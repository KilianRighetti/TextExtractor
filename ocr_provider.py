from config import OCR_API_KEY, OCR_BASE_URL
import requests

def extract_text(file):
    # response = requests.post(
    #     OCR_BASE_URL,
    #     headers={
    #         "Authorization": f"Bearer {OCR_API_KEY}"
    #     },
    #     files={
    #         "file": file
    #     }
    # )

    # return response
    
    return f"Ricevuto: {file.filename}"