from django.urls import include, path

from .views import DeviceView, MainPageView

urlpatterns = [
    path('api/v1/device', DeviceView.as_view()),
    path('', MainPageView.as_view(), name='MainPage'),
]
