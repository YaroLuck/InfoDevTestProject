"""Сериализаторы."""

from rest_framework import serializers

from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    """Сериализатор модели Device."""

    device_type = serializers.CharField(source="get_device_type_display")

    class Meta:
        """Мета класс, указываем сериализуемые поля."""

        model = Device
        fields = [
            'id',
            'name',
            'device_type',
            'address',
            'latitude',
            'longtitude',
            'cover_radius',
        ]
