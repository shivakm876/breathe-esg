# Breathe ESG Data Ingestion & Review Platform

## Overview

This project is a mini ESG (Environmental, Social, Governance) data ingestion and review platform built using Django and React.

The platform simulates how enterprise ESG systems collect, normalize, review, and validate sustainability-related emission data from multiple business sources.

The system supports:
- Multi-source ESG CSV ingestion
- Emission record normalization
- Suspicious record detection
- Analyst approval workflow
- Audit logging

---

# Features

## 1. SAP Fuel Data Ingestion

Simulates fuel consumption exports from ERP systems like SAP.

Fields:
- Fuel Type
- Quantity
- Unit
- Posting Date

Mapped to:
- Scope 1 emissions

---

## 2. Utility Electricity Ingestion

Simulates electricity consumption reports.

Fields:
- Meter ID
- kWh
- Billing Start
- Billing End

Mapped to:
- Scope 2 emissions

---

## 3. Travel Emission Ingestion

Simulates business travel activity.

Fields:
- From
- To
- Transport Type
- Distance

Mapped to:
- Scope 3 emissions

---

# Suspicious Record Detection

The platform flags potentially suspicious records using simple threshold-based rules.

Implemented Rules:
- Fuel quantity > 10000
- Utility usage > 20000 kWh
- Travel distance > 1500 km

Suspicious records are highlighted with red borders in the dashboard.

---

# Analyst Review Workflow

Each emission record supports:
- PENDING
- APPROVED
- REJECTED

Analysts can:
- Review uploaded records
- Approve valid records
- Reject suspicious records

Status updates are tracked using audit logs.

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- SQLite

## Frontend
- React
- Vite
- Axios

---

# Project Structure

```bash
breathe-esg/
│
├── backend/
│   ├── emissions/
│   ├── config/
│   ├── manage.py
│   ├── MODEL.md
│   └── DECISIONS.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── utility_sample.csv
│   ├── travel_sample.csv
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# API Endpoints

## Upload APIs

### SAP Upload
POST:
```bash
/api/upload/sap/
```

### Utility Upload
POST:
```bash
/api/upload/utility/
```

### Travel Upload
POST:
```bash
/api/upload/travel/
```

---

## Record APIs

### Get Records
GET:
```bash
/api/records/
```

### Update Record Status
POST:
```bash
/api/records/<record_id>/status/
```

---

# Backend Setup

## Step 1

```bash
cd backend
```

## Step 2

Create virtual environment:

```bash
python -m venv venv
```

## Step 3

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

---

## Step 4

Install dependencies:

```bash
pip install django djangorestframework pandas django-cors-headers
```

---

## Step 5

Run migrations:

```bash
python manage.py migrate
```

---

## Step 6

Start backend server:

```bash
python manage.py runserver
```

Backend runs at:

```bash
http://127.0.0.1:8000
```

---

# Frontend Setup

## Step 1

Open new terminal:

```bash
cd frontend
```

---

## Step 2

Install dependencies:

```bash
npm install
```

---

## Step 3

Install Axios:

```bash
npm install axios
```

---

## Step 4

Start frontend server:

```bash
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# Dashboard Features

- CSV uploads
- Multi-source ingestion
- Suspicious record highlighting
- Status color indicators
- Approve / Reject workflow
- Real-time dashboard updates

---

# Sample Files

Sample CSV files included:
- sap_sample.csv
- utility_sample.csv
- travel_sample.csv

---

# Future Improvements

Potential future enhancements:
- OCR-based ingestion
- AI anomaly detection
- Authentication system
- ESG analytics dashboard
- PostgreSQL integration
- Cloud deployment

---

# Author

Sivaganga km
B.Tech Computer Science Engineering
