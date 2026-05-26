# Technical Decisions

## Why Django Backend

Django was selected because:
- Fast API development
- Built-in ORM
- Easy database integration
- Rapid prototyping support
- Good scalability for enterprise applications

Django REST Framework was used to build ingestion APIs and review workflows.

---

# Why React Frontend

React was selected because:
- Component-based UI architecture
- Fast rendering
- Easy API integration using Axios
- Suitable for dashboard-style applications

---

# Why CSV-Based Ingestion

CSV uploads were used to simulate:
- SAP exports
- Utility billing exports
- Travel reporting systems

This matches how many enterprise ESG workflows operate in real environments.

---

# Why Unified Emission Model

Instead of creating separate database tables for every source type, all records are normalized into one EmissionRecord model.

Benefits:
- Easier analytics
- Simplified querying
- Consistent governance workflow
- Centralized review process

---

# Suspicious Record Detection

Simple threshold-based anomaly detection was implemented:

- Fuel quantity > 10000
- Utility consumption > 20000 kWh
- Travel distance > 1500 km

Purpose:
- Demonstrate ESG governance workflow
- Flag potentially abnormal activity

---

# Approval Workflow

Each emission record supports:
- PENDING
- APPROVED
- REJECTED

This simulates analyst review processes commonly used in ESG reporting systems.

---

# Scalability Considerations

The architecture was designed so future enhancements can include:
- OCR ingestion
- AI anomaly detection
- Authentication
- Role-based access
- Cloud deployment
- Advanced ESG analytics

---

# Frontend-Backend Communication

Frontend communicates with backend using REST APIs.

Axios was used for:
- File uploads
- Fetching records
- Updating approval statuses

---

# Database Choice

SQLite was used for local development because:
- Lightweight
- Easy setup
- Suitable for rapid prototyping

Production systems can later migrate to PostgreSQL.