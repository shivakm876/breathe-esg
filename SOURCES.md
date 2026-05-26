# Sources and Research Notes

## 1. SAP Fuel and Procurement Data

### What I Researched

I looked at how SAP exports are commonly shared in enterprise workflows.

Most examples I found used:
- CSV exports
- flat-file exports
- ERP-generated tables

Many SAP datasets also contain:
- inconsistent units
- internal plant codes
- difficult column naming
- mixed date formats

I intentionally kept the ingestion scope smaller instead of trying to simulate the full complexity of SAP.



### What I Chose to Handle

I handled:
- Fuel Type
- Quantity
- Unit
- Posting Date

Example:
- Diesel
- Petrol
- Natural Gas

This was enough to simulate Scope 1 operational fuel activity.

The ingestion flow uses CSV upload because CSV exports still appear frequently in enterprise reporting workflows.



### What I Ignored

I intentionally did not handle:
- plant lookup tables
- multilingual column mappings
- procurement hierarchies
- vendor master data
- SAP IDoc/BAPI integrations

Those would significantly increase complexity beyond the assignment scope.


### Why My Sample Data Looks Like This

The sample CSV was designed to resemble a simplified operational fuel export.

I intentionally included:
- different fuel types
- varying quantities
- suspiciously large values

to demonstrate analyst review and anomaly detection workflow.


### What Would Break in Real Deployments

Real SAP integrations would likely face:
- inconsistent schemas between organizations
- unit conversion problems
- duplicate uploads
- malformed exports
- missing lookup references
- timezone/date inconsistencies


# 2. Utility Electricity Data

### What I Researched

I researched how utility data is commonly exported by facilities teams.

Most realistic workflows involved:
- utility portal CSV exports
- billing spreadsheets
- monthly consumption reports

I found that utility datasets commonly include:
- meter identifiers
- billing periods
- consumption values
- units such as kWh


### What I Chose to Handle

I handled:
- Meter ID
- kWh
- Billing Start
- Billing End

These records were mapped to Scope 2 emissions.

The ingestion flow assumes electricity consumption reporting only.


### What I Ignored

I intentionally did not handle:
- tariff structures
- peak/off-peak pricing
- multiple utility providers
- renewable energy certificates
- utility APIs
- PDF bill OCR extraction

Those would require significantly more parsing and normalization logic.



### Why My Sample Data Looks Like This

The sample utility dataset was designed to resemble a simplified monthly electricity export.

I included:
- realistic meter IDs
- billing periods
- different electricity consumption values

Some larger values were intentionally added to trigger suspicious activity review.


### What Would Break in Real Deployments

Real utility ingestion would likely face:
- inconsistent billing periods
- missing units
- provider-specific formats
- estimated vs actual readings
- duplicate statements
- partial-month overlap issues



# 3. Corporate Travel Data

### What I Researched

I looked at how platforms like Concur and Navan expose travel-related reporting data.

Common fields included:
- transport category
- airport codes
- booking class
- hotel details
- travel distance

For this assignment, I intentionally simplified the ingestion shape.



### What I Chose to Handle

I handled:
- Transport Type
- Distance

Examples:
- Flight
- Train
- Taxi

These records were mapped to Scope 3 business travel emissions.

CSV upload was chosen because travel reports are often exported by finance or operations teams into spreadsheets before ESG reconciliation.



### What I Ignored

I intentionally did not handle:
- airport code mapping
- hotel emissions
- travel class weighting
- international vs domestic routing
- API integrations
- currency handling

Those would require more advanced enrichment pipelines.



### Why My Sample Data Looks Like This

The sample travel dataset was designed to resemble a simplified business travel report.

I intentionally included:
- multiple transport types
- varying travel distances
- unusually large distances

to simulate suspicious travel activity review.

### What Would Break in Real Deployments

Real travel ingestion would likely face:
- inconsistent travel categories
- missing distances
- duplicate expense reports
- timezone inconsistencies
- vendor-specific export formats
- partial booking information
- cancelled trip reconciliation