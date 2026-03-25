from django.db import IntegrityError
from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import DjangoModelPermissions
from rest_framework import status
from .serializers import *
from ..technical_maintenance.models import TechnicalMaintenance, TypeTechnicalMaintenance
from ..service_company.serializers import ServiceCompanySerializer, ServiceCompany
from ..technic.serializers import MachineSerializer, Machine

# Create your views here.

@api_view(["GET"])
def reference_books_technical_maintenance(request):
    type_technical_maintenance = TypeTechnicalMaintenanceSerializer(TypeTechnicalMaintenance.objects.all(), many=True)
    service_company = ServiceCompanySerializer(ServiceCompany.objects.all(), many=True)

    return (Response({"type_technical_maintenance": type_technical_maintenance.data,
                      "service_company": service_company.data
                      }))


class CreateTechnicalMaintenance(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = TechnicalMaintenance.objects.all()

    def post(self, request):
        data = request.data
        type_technical_maintenance = TypeTechnicalMaintenance.objects.get(id=data["type_technical_maintenance"])
        date_maintenance = datetime.strptime(data["date_maintenance"], "%Y-%m-%dT%H:%M")
        operating_time = int(data["operating_time"])
        order_number = data["order_number"]
        date_order_number = datetime.strptime(data["date_order_number"], "%Y-%m-%dT%H:%M")
        mashine = Machine.objects.get(number_machine=data["machine"])
        service_company = ServiceCompany.objects.get(id=data["service_company"])

        if ( not ("id" in data) and data["type_post"] == "create"):

            try:
                new_technical_maintenance = TechnicalMaintenance(type_technical_maintenance=type_technical_maintenance,
                                          service_company=service_company, machine=mashine)
                new_technical_maintenance.date_maintenance = date_maintenance
                new_technical_maintenance.operating_time = operating_time
                new_technical_maintenance.order_number = order_number
                new_technical_maintenance.date_order_number = date_order_number
                new_technical_maintenance.save()

                return (Response({"data": "data"}
                                 ))
            except IntegrityError as error:
                return (Response(data={"message": error}, status=status.HTTP_501_NOT_IMPLEMENTED
                                 ))
        if (("id" in data) and data["type_post"] == "update"):
            update_technical_maintenance = TechnicalMaintenance.objects.get(id=data["id"])
            update_technical_maintenance.type_technical_maintenance = type_technical_maintenance
            update_technical_maintenance.date_maintenance = date_maintenance
            update_technical_maintenance.operating_time = operating_time
            update_technical_maintenance.order_number = order_number
            update_technical_maintenance.date_order_number = date_order_number
            update_technical_maintenance.machine = mashine
            update_technical_maintenance.service_company = service_company
            update_technical_maintenance.save()
            return Response({"data": "data"})



class TechnicalMaintenancetDetail(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = TechnicalMaintenance.objects.all()

    def get(self, request, number_technical_maintenance):
        technical_maintenance = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.get(id=number_technical_maintenance))
        return Response({"technical_maintenance": technical_maintenance.data,})












@api_view(["GET"])
def technical_maintenance(request, user_id):
    if request.method == "GET":

        maintenance = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.filter(machine__client__id=user_id), many=True)
        fields = [field.verbose_name for field in TechnicalMaintenance._meta.fields]

        return (Response({"data": maintenance.data,
                          "fields": fields}
                         ))


