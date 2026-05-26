# Technical Decisions

## Why Django Backend

Django was chosen mainly because the assignment focused heavily on ingestion workflows, data modeling, and analyst review pipelines rather than frontend-heavy interaction.

The built-in ORM made it easier to iterate quickly on the emission data model while keeping relationships between organizations, uploaded sources, records, and audit logs manageable.

Django REST Framework was used to expose ingestion APIs and approval workflows.


# Why React Frontend

React was used mainly because the UI required repeated review components, upload workflows, and dynamic record updates after approvals and rejections.

The frontend was intentionally kept simple and analyst-focused instead of highly styled.

Axios was used for API communication because the application only required lightweight REST interactions.


# Why CSV-Based Ingestion

CSV uploads were chosen to simulate how ESG data is commonly exported from enterprise systems.

Research showed that many organizations still rely heavily on:
- SAP CSV exports
- Utility billing exports
- Travel reporting exports

instead of real-time integrations.

The assignment also emphasized realistic ingestion flows over polished UI complexity.



# Why Unified Emission Model

Instead of creating separate database tables for SAP, Utility, and Travel data, all records are normalized into one central EmissionRecord model.

Benefits:
- Easier querying
- Consistent governance workflow
- Simpler analyst review process
- Centralized auditability

This approach also makes future analytics easier because all records share a common structure.



# Suspicious Record Detection

Simple threshold-based anomaly detection was implemented:

- Fuel quantity > 10000
- Utility consumption > 20000 kWh
- Travel distance > 1500 km

Purpose:
- Demonstrate governance workflow
- Surface unusual activity for analyst review

The implementation was intentionally rule-based instead of ML-based to keep decisions explainable and easier to validate during review.


# Approval Workflow

Each emission record supports:
- PENDING
- APPROVED
- REJECTED

This simulates analyst review processes commonly found in ESG governance systems.

Audit logs preserve approval history for future compliance requirements.


# Frontend-Backend Communication

Frontend and backend communicate through REST APIs.

Axios was used for:
- File uploads
- Fetching records
- Updating approval status

The frontend was deployed separately from the backend to simulate a more realistic production-style architecture.


# Database Choice

SQLite was used because the assignment focused more on ingestion design and governance workflows than production-scale infrastructure.

Benefits:
- Lightweight setup
- Fast local development
- Easy deployment during prototyping

In a production deployment, PostgreSQL would likely replace SQLite.


# Ambiguities and Assumptions

Several parts of the assignment were intentionally open-ended.

Assumptions made:

- CSV ingestion was prioritized over direct ERP/API integrations to simplify testing.
- Utility uploads were assumed to represent electricity consumption only.
- Travel records were simplified to transport type and distance instead of full expense-report schemas.
- Simplified normalization was used instead of full CO2e conversion pipelines.
- Threshold-based anomaly detection was used instead of ML-driven scoring.
- Duplicate upload handling was intentionally left minimal.



# Questions I Would Ask a PM

- Should approved records become immutable?
- Should different organizations support custom anomaly thresholds?
- Should normalization convert activities directly into CO2e values?
- How should duplicate uploads be detected and resolved?
- What level of audit retention is required for compliance?
- Should ingestion failures partially succeed or fail the entire upload?


# Scalability Considerations

The architecture was intentionally kept modular so future enhancements can include:

- OCR ingestion
- Vendor-specific adapters
- Authentication
- Role-based access control
- AI-based anomaly detection
- Background processing for large uploads
- PostgreSQL migration
- Advanced ESG analytics
- Cloud-native scaling