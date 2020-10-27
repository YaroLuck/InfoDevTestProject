from rest_framework import serializers

from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    """Устройство"""
    device_type = serializers.CharField(source="get_device_type_display")

    class Meta:
        model = Device
        fields = [
            'name',
            'device_type',
            'address',
            'latitude',
            'longtitude',
            'cover_radius',
        ]
