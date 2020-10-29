from django.contrib import admin

from alarmdevice.models import Device

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "device_type",
        "address",
        "latitude",
        "longtitude",
        "cover_radius",
    )

