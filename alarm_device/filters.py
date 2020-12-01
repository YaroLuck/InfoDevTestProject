import django_filters
from django.utils.translation import ugettext_lazy

from alarm_device.models import Device


class DeviceFilter(django_filters.FilterSet):
    device_type = django_filters.ChoiceFilter(choices=Device.DEVICES,
                                              empty_label=ugettext_lazy(u'Все типы'))
    cover_radius_gt = django_filters.NumberFilter(field_name='cover_radius',
                                                  lookup_expr='gte')
    cover_radius_lt = django_filters.NumberFilter(field_name='cover_radius',
                                                  lookup_expr='lte')
    longtitude_gt = django_filters.NumberFilter(field_name='longtitude',
                                                lookup_expr='gte')
    longtitude_lt = django_filters.NumberFilter(field_name='longtitude',
                                                lookup_expr='lte')
    latitude_gt = django_filters.NumberFilter(field_name='latitude',
                                              lookup_expr='gte')
    latitude_lt = django_filters.NumberFilter(field_name='latitude',
                                              lookup_expr='lte')


    class Meta:
        model = Device
        fields = [
            'device_type',
            'cover_radius_gt',
            'cover_radius_lt',
            'longtitude_gt',
            'longtitude_lt',
            'latitude_gt',
            'latitude_lt',
        ]
