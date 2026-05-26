import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import EmissionRecordSerializer


@api_view(['POST'])
def upload_sap(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    org, _ = Organization.objects.get_or_create(
        name="Demo Company"
    )

    source = DataSource.objects.create(
        organization=org,
        source_type='SAP',
        file_name=file.name
    )

    created = []

    for _, row in df.iterrows():

        suspicious = False

        if row['Quantity'] > 10000:
            suspicious = True

        record = EmissionRecord.objects.create(
            organization=org,
            source=source,
            scope='Scope 1',
            category='Fuel',
            activity_type=row['Fuel Type'],
            raw_value=row['Quantity'],
            normalized_value=row['Quantity'],
            unit=row['Unit'],
            normalized_unit='liters',
            date=row['Posting Date'],
            is_suspicious=suspicious
        )

        created.append(record)

    serializer = EmissionRecordSerializer(created, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def upload_utility(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    org, _ = Organization.objects.get_or_create(
        name="Demo Company"
    )

    source = DataSource.objects.create(
        organization=org,
        source_type='UTILITY',
        file_name=file.name
    )

    created = []

    for _, row in df.iterrows():

        suspicious = False

        if row['kWh'] > 20000:
            suspicious = True

        record = EmissionRecord.objects.create(
            organization=org,
            source=source,
            scope='Scope 2',
            category='Electricity',
            activity_type='Utility Electricity',
            raw_value=row['kWh'],
            normalized_value=row['kWh'],
            unit='kWh',
            normalized_unit='kWh',
            date=row['Billing Start'],
            is_suspicious=suspicious
        )

        created.append(record)

    serializer = EmissionRecordSerializer(created, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def upload_travel(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    org, _ = Organization.objects.get_or_create(
        name="Demo Company"
    )

    source = DataSource.objects.create(
        organization=org,
        source_type='TRAVEL',
        file_name=file.name
    )

    created = []

    for _, row in df.iterrows():

        suspicious = False

        if int(row['Distance']) > 1500:
            suspicious = True

        record = EmissionRecord.objects.create(
            organization=org,
            source=source,
            scope='Scope 3',
            category='Business Travel',
            activity_type=row['Transport Type'],
            raw_value=row['Distance'],
            normalized_value=row['Distance'],
            unit='km',
            normalized_unit='km',
            date='2026-05-01',
            is_suspicious=suspicious
        )

        created.append(record)

    serializer = EmissionRecordSerializer(created, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all()

    serializer = EmissionRecordSerializer(records, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def update_status(request, record_id):

    record = EmissionRecord.objects.get(id=record_id)

    status = request.data.get('status')

    record.status = status

    record.save()

    AuditLog.objects.create(
        record=record,
        action=f"Status changed to {status}"
    )

    return Response({
        "message": "Status updated"
    })