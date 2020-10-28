from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import View
from rest_framework.generics import ListAPIView

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Device
from .pagination import StandardResultsSetPagination
from .serializers import DeviceSerializer


class DeviceView(APIView):
    """Список всех устройств АПИ"""
    def get(self, request):
        devices = Device.objects.all()
        serializer = DeviceSerializer(devices, many=True)
        return Response({"devices": serializer.data})


class MainPageView(View):
    """Список всех устройств"""
    def get(self, request):
        device_list = Device.objects.all()
        paginator = Paginator(device_list, 3)
        page = request.GET.get('page')
        try:
            devices = paginator.page(page)
        except PageNotAnInteger:
            devices = paginator.page(1)
        except EmptyPage:
            devices = paginator.page(paginator.num_pages)
        return render(request,
                      'alarmdevice/index.html',
                      {'page': page,
                       'devices': devices})


class DeviceListing(ListAPIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()


def DeviceList(request):
    return render(request, 'alarmdevice/device.html', {})
