"""alarmdevice/admin.py."""

from alarmdevice.models import Device

from django.contrib import admin


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    """Админка."""

    list_display = (
        "id",
        "name",
        "device_type",
        "address",
        "latitude",
        "longtitude",
        "cover_radius",
    )
