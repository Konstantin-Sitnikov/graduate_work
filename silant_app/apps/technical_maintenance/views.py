from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from ..service_company.serializers import ServiceCompanySerializer, ServiceCompany
from ..technic.serializers import MachineSerializer, Machine

# Create your views here.

@api_view(["GET"])
def information_technical_maintenance(request):
    type_technical_maintenance = TypeTechnicalMaintenanceSerializer(TypeTechnicalMaintenance.objects.all(), many=True)
    machine = MachineSerializer(Machine.objects.all(), many=True)
    service_company = ServiceCompanySerializer(ServiceCompany.objects.all(), many=True)

    return (Response({"type_technical_maintenance": type_technical_maintenance.data,
                      "machine": machine.data,
                      "service_company": service_company.data
                      }))


@api_view(["GET"])
def technical_maintenance(request):
    if request.method == "GET":

        maintenance = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.all(), many=True)
        fields = [field.verbose_name for field in TechnicalMaintenance._meta.fields]

        return (Response({"data": maintenance.data,
                          "fields": fields}
                         ))