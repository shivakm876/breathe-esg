# Tradeoffs

## 1. Authentication System

I did not build authentication or role-based access control.

The main goal was to focus more on ingestion, normalization, suspicious record detection, and analyst review workflow first.

For this assignment, I felt the core ESG pipeline was more important than user management features.

In a real deployment, different analyst and admin roles would be necessary.


## 2. Full CO2e Calculation Engine

The system stores normalized operational values like:
- liters
- kWh
- km

but it does not calculate final CO2e emissions.

I intentionally kept this simplified because real ESG calculations depend on:
- region
- emission factors
- reporting standards
- vendor datasets

Instead, I focused more on building the ingestion and governance workflow correctly.


## 3. Large File and Background Processing

CSV uploads are currently processed directly during the request.

I did not implement background workers or async processing because the assignment size did not require large-scale ingestion infrastructure.

The focus was mainly on correctness of ingestion flow and review workflow rather than distributed processing.