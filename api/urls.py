from django.urls import include, path


urlpatterns = [
    path("alarmdevice/", include("api.alarmdevice.urls")),
]