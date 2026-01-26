# document_check.py

import io
from PyPDF2 import PdfReader

# List of suspicious creators/producers that might indicate fake documents
suspicious_creators = [
    'adobe illustrator',
    'canva',
    'photoshop',
    'gimp',
    'paint',
    'ms paint',
    'online-convert',
    'pdf converter'
]


def check_pdf_metadata(file_content: bytes):
    """
    Read PDF metadata and flag suspicious document creators.
    
    Args:
        file_content: The PDF file content as bytes
        
    Returns:
        A dictionary with metadata info and risk assessment
    """
    try:
        # Read the PDF
        pdf_reader = PdfReader(io.BytesIO(file_content))
        metadata = pdf_reader.metadata
        
        if not metadata:
            return {
                "status": "unknown",
                "creator": None,
                "producer": None,
                "risk_level": "medium",
                "message": "No metadata found in PDF"
            }
        
        creator = metadata.get('/Creator', '').lower() if metadata.get('/Creator') else None
        producer = metadata.get('/Producer', '').lower() if metadata.get('/Producer') else None
        
        # Check for suspicious creators
        is_suspicious = False
        reason = None
        
        if creator:
            for suspicious in suspicious_creators:
                if suspicious in creator:
                    is_suspicious = True
                    reason = f"Suspicious creator detected: {creator}"
                    break
        
        if not is_suspicious and producer:
            for suspicious in suspicious_creators:
                if suspicious in producer:
                    is_suspicious = True
                    reason = f"Suspicious producer detected: {producer}"
                    break
        
        risk_level = "high" if is_suspicious else "low"
        status = "fake" if is_suspicious else "authentic"
        
        return {
            "status": status,
            "creator": metadata.get('/Creator'),
            "producer": metadata.get('/Producer'),
            "risk_level": risk_level,
            "message": reason or "Document appears to be authentic"
        }
        
    except Exception as e:
        return {
            "status": "error",
            "creator": None,
            "producer": None,
            "risk_level": "unknown",
            "message": f"Error reading PDF: {str(e)}"
        }
