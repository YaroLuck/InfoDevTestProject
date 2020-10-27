from django.urls import include, path

from .views import DeviceView

urlpatterns = [
    path('', DeviceView.as_view()),
]
