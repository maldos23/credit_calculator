# BBVA Credit Pre-evaluator API

A FastAPI-based credit application pre-evaluation system that provides automated credit decisions based on configurable business rules.

## Features

- **Credit Application Evaluation**: Automated evaluation of credit applications with approval, counteroffer, or rejection decisions
- **Policy Management**: Configurable credit policies and business rules
- **RESTful API**: Clean REST API with OpenAPI documentation
- **Data Validation**: Comprehensive input validation using Pydantic models
- **Health Monitoring**: Built-in health check endpoints

## Project Structure

```
api/
├── src/
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py          # Configuration and policy settings
│   ├── models/
│   │   ├── __init__.py
│   │   ├── application.py     # Data models for applications
│   │   └── schemas.py         # Pydantic schemas for API
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── credit.py          # Credit evaluation endpoints
│   │   └── health.py          # Health check endpoints
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── calculators.py     # Credit calculation utilities
│   │   ├── evaluator.py       # Main evaluation logic
│   │   └── validators.py      # Application validation
│   └── __init__.py
├── app_server.py              # FastAPI application entry point
├── main.py                    # Original console application
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Requirements

- Python 3.13+
- FastAPI
- Uvicorn
- Pydantic

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bbva-prevealuator-credit/api
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

### Development Mode
```bash
python app_server.py
```
or
```bash
uvicorn app_server:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
uvicorn app_server:app --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Documentation**: http://localhost:8000/docs
- **ReDoc Documentation**: http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /api/v1/health` - Check API health status

### Credit Evaluation
- `POST /api/v1/evaluate` - Evaluate a credit application
- `GET /api/v1/policy` - Get current credit policy information

## Usage Examples

### Health Check
```bash
curl http://localhost:8000/api/v1/health
```

### Credit Application Evaluation
```bash
curl -X POST "http://localhost:8000/api/v1/evaluate" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "age": 35,
       "monthly_income": 25000,
       "monthly_debt": 5000,
       "employment_type": "EMPLOYEE",
       "months_of_experience": 24,
       "credit_score": 720,
       "amount": 150000,
       "term": 36,
       "active_defaults": false
     }'
```

### Get Policy Information
```bash
curl http://localhost:8000/api/v1/policy
```

## Credit Policy Rules

The system evaluates applications based on the following criteria:

- **Age**: 18-69 years
- **Income**: Minimum 7,500 MXN monthly
- **Loan Amount**: 10,000 - 300,000 MXN
- **Loan Term**: 12-60 months
- **Employment Experience**: 
  - Employees: minimum 6 months
  - Self-employed: minimum 12 months
- **Credit Score**: Minimum 600
- **DTI Limits**:
  - Current DTI: ≤ 40%
  - Total DTI (including new loan): ≤ 50%
- **Payment Affordability**: ≤ 30% of income
- **Default Status**: No active defaults allowed

## Decision Types

1. **APPROVED**: Application meets all criteria
2. **COUNTEROFFER**: Alternative terms offered when original request doesn't meet DTI/affordability limits
3. **REJECTED**: Application fails one or more basic criteria

## Configuration

Application settings can be configured through environment variables or the `app/core/config.py` file:

- `APP_NAME`: Application name
- `VERSION`: API version
- `DESCRIPTION`: API description
- `DEBUG`: Enable debug mode
- `HOST`: Server host
- `PORT`: Server port

## Development

### Running Tests
```bash
python -m pytest tests/
```

### Code Quality
```bash
# Format code
black app/

# Check linting
flake8 app/

# Type checking
mypy app/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes.