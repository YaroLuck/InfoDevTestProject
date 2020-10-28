from django.urls import include, path

from .views import DeviceView, MainPageView, DeviceList, DeviceListing

urlpatterns = [
    # path('api/v1/device', DeviceView.as_view()),
    # path('', MainPageView.as_view(), name='MainPage'),
    path('', DeviceList),
    path('device_listing/', DeviceListing.as_view(), name='listing'),
]
