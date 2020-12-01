"""Представления."""

from django.db.models import Q
from django.http import JsonResponse
from django.views.generic import ListView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from rest_framework.generics import ListAPIView

from .filters import DeviceFilter
from .models import Device
from .pagination import StandardResultsSetPagination
from .serializers import DeviceSerializer


class GenerateView(ListView):
    """Генерирующий стартовую страницу вью"""

    model = Device
    template_name = 'alarm_device/home.html'
    paginate_by = 3
    context_object_name = 'devices'


class DeviceListView(ListView):
    """Вывод шаблона для списка устройств."""

    queryset = Device.objects.all()
    template_name = 'alarm_device/device.html'


class DeviceListing(ListAPIView):
    """Api для списка устройств."""

    pagination_class = StandardResultsSetPagination
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()

    def get_queryset(self):
        """фильтрация."""
        query_list = Device.objects.all()
        device_type = self.request.query_params.get('device_type', None)
        min_radius = self.request.query_params.get('min_radius', None)
        max_radius = self.request.query_params.get('max_radius', None)
        upper_left_x = self.request.query_params.get('upper_left_x', None)
        upper_left_y = self.request.query_params.get('upper_left_y', None)
        bottom_right_x = self.request.query_params.get('bottom_right_x', None)
        bottom_right_y = self.request.query_params.get('bottom_right_y', None)
        search_name_address = self.request.query_params.get(
            'search_name_address', None)

        if device_type:
            device_type_reverse = dict((v, k) for k, v in Device.DEVICES)
            query_list = query_list.filter(
                device_type=device_type_reverse[device_type]
            )
        if min_radius:
            query_list = query_list.filter(cover_radius__gte=min_radius)
        if max_radius:
            query_list = query_list.filter(cover_radius__lte=max_radius)
        if upper_left_x and upper_left_y and bottom_right_x and bottom_right_y:
            query_list = query_list.filter(
                longtitude__gte=upper_left_x,
                longtitude__lte=bottom_right_x,
                latitude__gte=bottom_right_y,
                latitude__lte=upper_left_y,)
        if search_name_address:
            query_list = query_list.filter(
                Q(name__contains=search_name_address) |
                Q(address__contains=search_name_address)
            )

        return query_list


def get_device_types(request):
    """список доступных типов устройств."""
    if request.method == "GET" and request.is_ajax():
        device_types = Device.DEVICES
        device_types = [i[1] for i in list(device_types)]
        data = {
            "device_types": device_types,
        }
        return JsonResponse(data, status=200)


class DeviceApiView(ListAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    paginate_by = 3
    # pagination_class = DevicePagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = DeviceFilter
    search_fields = ['name', 'address']
