from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q
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

    def get_queryset(self):
        # фильтрация
        query_list = Device.objects.all()
        device_type = self.request.query_params.get('device_type', None)
        min_radius = self.request.query_params.get('min_radius', None)
        max_radius = self.request.query_params.get('max_radius', None)
        upper_left_x = self.request.query_params.get('upper_left_x', None)
        upper_left_y = self.request.query_params.get('upper_left_y', None)
        bottom_right_x = self.request.query_params.get('bottom_right_x', None)
        bottom_right_y = self.request.query_params.get('bottom_right_y', None)

        if device_type:
            device_type_reverse = dict((v, k) for k, v in Device.DEVICES)
            query_list = query_list.filter(device_type=device_type_reverse[device_type])
        if min_radius:
            query_list = query_list.filter(cover_radius__gte=min_radius)
        if max_radius:
            query_list = query_list.filter(cover_radius__lte=max_radius)
        if upper_left_x and upper_left_y and bottom_right_x and bottom_right_y:
            query_list = query_list.filter(longtitude__gte=upper_left_x).\
                filter(longtitude__lte=bottom_right_x).\
                filter(latitude__gte=bottom_right_y).\
                filter(latitude__lte=upper_left_y)

        return query_list


def device_list(request):
    return render(request, 'alarmdevice/device.html', {})


def get_device_types(request):
    if request.method == "GET" and request.is_ajax():
        # device_types = Device.objects.\
        #     order_by('device_type').\
        #     values_list('device_type').\
        #     distinct()
        device_types = Device.DEVICES
        device_types = [i[1] for i in list(device_types)]
        data = {
            "device_types": device_types,
        }
        return JsonResponse(data, status=200)
