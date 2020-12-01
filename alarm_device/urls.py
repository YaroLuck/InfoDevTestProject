"""Маршрутизация уровня приложения alarm_device."""

from django.urls import path

from .views import GenerateView, DeviceApiView


urlpatterns = [
    path('', GenerateView.as_view()),
    path('api/', DeviceApiView.as_view(), name='api')
]


