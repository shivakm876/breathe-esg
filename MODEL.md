# Data Model Design

## Overview

The platform is designed to ingest ESG-related emission data from multiple enterprise systems such as SAP exports, utility billing reports, and business travel reports.

The backend normalizes all records into a single unified emission model for easier review, auditing, and analytics.

The system was intentionally designed around a centralized emission record structure instead of source-specific tables to simplify ingestion workflows and analyst review operations.

---

# Main Models

## Organization

Represents a company using the ESG platform.

Fields:
- name

Purpose:
- Supports future multi-company scalability.
- Keeps ESG records isolated between organizations.

---

## DataSource

Tracks uploaded files and their origin.

Fields:
- organization
- source_type
- file_name
- uploaded_at

Purpose:
- Maintains source-of-truth tracking.
- Helps identify whether records came from SAP, Utility, or Travel systems.
- Preserves ingestion history for auditability.

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
- edited_by
- edited_at

Purpose:
- Stores normalized emission activity data.
- Central model used across all ingestion pipelines.
- Preserves both raw source values and normalized values for analytics consistency.

Examples:
- SAP fuel → Scope 1
- Electricity usage → Scope 2
- Business travel → Scope 3

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
- Maintains review history for compliance purposes.

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

Instead of creating separate database tables for SAP, Utility, and Travel data, all records are normalized into one central model.

Benefits:
- Simplifies querying
- Easier filtering and reporting
- Consistent review workflow
- Centralized governance process

---

## Multi-Tenancy

All major models are linked to the Organization model.

This allows the platform to support multiple companies while keeping their ESG records logically separated.

---

## Source-of-Truth Tracking

Each uploaded file creates a DataSource entry.

Emission records remain linked to the original uploaded source so analysts can trace where data originated.

This becomes important during ESG audits and reconciliation workflows.

---

## Unit Normalization

The system stores:
- raw_value
- normalized_value
- unit
- normalized_unit

This preserves original uploaded data while still allowing future standardized reporting and analytics.

Example:
- liters
- kWh
- km

can later be normalized into emission-equivalent metrics.

---

## Suspicious Record Detection

Simple threshold-based rules were implemented:

- Fuel quantity > 10000
- Utility kWh > 20000
- Travel distance > 1500

Purpose:
- Demonstrates anomaly detection workflow.
- Helps analysts quickly identify unusual activity.

The implementation is intentionally rule-based rather than ML-based to keep the workflow explainable and easy to validate.

---

## Review Workflow

Each emission record supports:
- PENDING
- APPROVED
- REJECTED

This simulates analyst review processes commonly used in ESG governance systems.

Audit logs preserve review history.

---

# Future Improvements

Potential future enhancements:
- AI-based anomaly detection
- OCR ingestion
- Automated emission factor calculations
- Authentication system
- Role-based access control
- Vendor-specific ingestion adapters
- Duplicate detection
- Background processing for large uploads
- Dashboard analytics
- PostgreSQL migration
- Cloud-native scaling