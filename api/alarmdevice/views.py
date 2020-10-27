from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Device
from .serializers import DeviceSerializer

class DeviceView(APIView):
    def get(self, request)
        devices = Device.objects.all()
        serializer = DeviceSerializer(articles, many=True)
        return Response({"devices": serializer.data})
