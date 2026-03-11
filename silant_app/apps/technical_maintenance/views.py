from django.shortcuts import render
from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import DjangoModelPermissions
from .serializers import *
from ..technical_maintenance.models import TechnicalMaintenance, TypeTechnicalMaintenance
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




        #new_complaint = Complaint(failure_node=failure_node, recovery_method=recovery_method,
                                  #service_company=service_company, machine=mashine)
        #new_complaint.date_failure = date_failure
        #new_complaint.operating_time = operating_time
        #new_complaint.description_failure = description_failure
        #new_complaint.used_parts = used_parts
        #new_complaint.date_restoration = date_restoration
        #new_complaint.downtime = downtime
        #new_complaint.save()

        return (Response({"data": "data"}
                         ))
















@api_view(["GET"])
def technical_maintenance(request, user_id):
    if request.method == "GET":

        maintenance = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.filter(machine__client__id=user_id), many=True)
        fields = [field.verbose_name for field in TechnicalMaintenance._meta.fields]

        return (Response({"data": maintenance.data,
                          "fields": fields}
                         ))


