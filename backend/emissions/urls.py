from django.urls import path
from .views import *

urlpatterns = [
    path('upload/sap/', upload_sap),
    path('upload/utility/', upload_utility),
    path('upload/travel/', upload_travel),
    path('records/', get_records),

    path(
        'records/<int:record_id>/status/',
        update_status
    ),
]