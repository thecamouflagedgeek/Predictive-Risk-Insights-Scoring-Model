from fastapi import APIRouter, UploadFile, File
from services.document_check import check_pdf_metadata

router = APIRouter(prefix="/document")


@router.post("/check-pdf")
async def check_document(file: UploadFile = File(...)):
    """
    Analyze a PDF document for authenticity by checking metadata.
    
    Flags suspicious documents that were created using:
    - Adobe Illustrator
    - Canva
    - Photoshop
    - GIMP
    - MS Paint
    - Online PDF converters
    
    Args:
        file: The PDF file to check
        
    Returns:
        Document analysis with risk assessment
    """
    # Read the uploaded file
    contents = await file.read()
    
    # Check the PDF metadata
    result = check_pdf_metadata(contents)
    
    return {
        "filename": file.filename,
        "file_type": file.content_type,
        "analysis": result
    }
