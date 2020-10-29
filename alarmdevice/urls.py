from django.urls import include, path

from .views import DeviceListing, get_device_types, DeviceListView

urlpatterns = [
    path('', DeviceListView.as_view()),
    path('device_listing/', DeviceListing.as_view(), name='listing'),
    path("ajax/types/", get_device_types, name='get_device_types'),
]
