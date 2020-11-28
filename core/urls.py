"""Маршрутизация проекта."""

from django.contrib import admin
from django.urls import include, path

from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('alarm_device.urls'))
] + doc_urls
