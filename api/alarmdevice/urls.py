from django.urls import include, path

from .views import DeviceView


 urlpatterns = [
    path("devices/", DeviceView.as_view()),
]