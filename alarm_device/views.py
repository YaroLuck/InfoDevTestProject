"""Представления."""

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
    context_object_name = 'devices'


class DeviceApiView(ListAPIView):

    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = DeviceFilter
    search_fields = ['name', 'address']
