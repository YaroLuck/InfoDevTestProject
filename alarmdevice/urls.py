from django.urls import include, path

from .views import device_list, DeviceListing, get_device_types

urlpatterns = [
    # path('api/v1/device', DeviceView.as_view()),
    # path('', MainPageView.as_view(), name='MainPage'),
    path('', device_list),
    path('device_listing/', DeviceListing.as_view(), name='listing'),
    path("ajax/types/", get_device_types, name='get_device_types'),
]
