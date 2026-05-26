# Data Model Design

## Overview

The platform is designed to ingest ESG-related emission data from multiple enterprise systems such as SAP exports, utility bills, and travel reports.

The backend normalizes all records into a single unified emission model for easier review and auditing.

---

# Main Models

## Organization

Represents a company using the ESG platform.

Fields:
- name

Purpose:
- Supports multi-company scalability in future deployments.

---

## DataSource

Tracks uploaded files and their origin.

Fields:
- organization
- source_type
- file_name
- uploaded_at

Purpose:
- Maintains ingestion traceability.
- Helps identify whether records came from SAP, Utility, or Travel systems.

---

## EmissionRecord

Core normalized ESG record model.

Fields:
- organization
- source
- scope
- category
- activity_type
- raw_value
- normalized_value
- unit
- normalized_unit
- date
- status
- is_suspicious

Purpose:
- Stores normalized emission activity data.
- Central model used across all ingestion pipelines.

---

## AuditLog

Tracks reviewer actions performed on emission records.

Fields:
- record
- action
- timestamp

Purpose:
- Provides governance and auditability.
- Tracks approval and rejection workflows.

---

# Relationships

Organization
→ has many DataSources

DataSource
→ has many EmissionRecords

EmissionRecord
→ has many AuditLogs

---

# Design Decisions

## Unified Emission Model

Instead of creating separate tables for SAP, Utility, and Travel data, all records are normalized into one model.

Benefits:
- Simplifies analytics
- Easier filtering and reporting
- Consistent review workflow

---

## Suspicious Record Detection

Simple rule-based thresholds were used:

- Fuel quantity > 10000
- Utility kWh > 20000
- Travel distance > 1500

Purpose:
- Demonstrates anomaly detection workflow.
- Helps ESG analysts identify unusual activity.

---

## Review Workflow

Each record supports:
- PENDING
- APPROVED
- REJECTED

This simulates real-world ESG governance processes.

---

# Future Improvements

Potential future enhancements:
- AI-based anomaly detection
- OCR ingestion
- Automated emission factor calculation
- User authentication
- Dashboard analytics
- Cloud deployment
