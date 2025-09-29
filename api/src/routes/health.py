from fastapi import APIRouter
from src.models.schemas import HealthCheckResponse

router = APIRouter(prefix="/api/v1", tags=["health"])


@router.get("/health", response_model=HealthCheckResponse)
async def health_check():
    """Health check endpoint to verify API status."""
    return HealthCheckResponse(
        status="healthy",
        message="BBVA Credit Pre-evaluator API is running"
    )