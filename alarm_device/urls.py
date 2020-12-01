"""Маршрутизация уровня приложения alarm_device."""

from django.urls import path

from .views import DeviceListView, DeviceListing, get_device_types, GenerateView, DeviceApiView

urlpatterns = [
    path('', DeviceListView.as_view()),
    path('device_listing/', DeviceListing.as_view(), name='listing'),

    path("ajax/types/", get_device_types, name='get_device_types'),

    path('generate/', GenerateView.as_view()),
    path('api', DeviceApiView.as_view(), name='api')
]
