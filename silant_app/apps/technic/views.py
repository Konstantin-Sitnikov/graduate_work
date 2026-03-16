from tokenize import group

from django.middleware.csrf import get_token
from django.http import JsonResponse
from datetime import datetime

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import DjangoModelPermissions
from .serializers import *
from ..service_company.serializers import ServiceCompanySerializer, ServiceCompany
from ..complaint.serializers import ComplaintSerializer
from ..complaint.models import Complaint

from ..technical_maintenance.serializers import TechnicalMaintenanceSerializer
from ..technical_maintenance.models import TechnicalMaintenance



@api_view(["GET"])
def information_machines(request):
    technic = TechnicSerializer(Technic.objects.all(), many=True)
    engine = EngineSerializer(Engine.objects.all(), many=True)
    transmission = TransmissionSerializer(Transmission.objects.all(), many=True)
    driving_bridge = DrivingBridgeSerializer(DrivingBridge.objects.all(), many=True)
    controlled_bridge = ControlledBridgeSerializer(ControlledBridge.objects.all(), many=True)
    user = UserSerializer(User.objects.all(), many=True)
    service_company = ServiceCompanySerializer(ServiceCompany.objects.all(), many=True)

    return (Response({"model_technic": technic.data,
                      "model_engine": engine.data,
                      "model_transmission":transmission.data,
                      "model_driving_bridge":driving_bridge.data,
                      "model_controlled_bridge": controlled_bridge.data,
                      "client": user.data,
                      "service_company": service_company.data
                      }))


def get_user_machine(user_id):
    user = User.objects.get(id=user_id)

    if (user.groups.filter(name="Manager").exists()):
        return Machine.objects.all()

    elif (user.groups.filter(name="Service_company").exists()):

        service_company_id = user.servicecompanyprofile.service_company.id
        return Machine.objects.filter(service_company__id=service_company_id)
    else:
        return Machine.objects.filter(client__id=user_id)





class Machines(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Machine.objects.all()

    def get(self, request, user_id):
        machine = get_user_machine(user_id=user_id)
        machine_ids = machine.values_list('number_machine', flat=True)

        machine_data = MachineSerializer(machine, many=True)
        machine_fields = [field.verbose_name for field in Machine._meta.fields]

        complaint_data = ComplaintSerializer(Complaint.objects.filter(machine__in=machine_ids), many=True)
        complaint_fields = [field.verbose_name for field in Complaint._meta.fields]

        technical_maintenance_data = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.filter(machine__in=machine_ids), many=True)
        technical_maintenance_fields = [field.verbose_name for field in TechnicalMaintenance._meta.fields]


        return (Response({"machine_data": machine_data.data,
                          "machine_fields": machine_fields,
                          "complaint_data": complaint_data.data,
                          "complaint_fields": complaint_fields,
                          "technical_maintenance_data": technical_maintenance_data.data,
                          "technical_maintenance_fields": technical_maintenance_fields,
                          }


                         ))




class MachineDetail(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Machine.objects.all()

    def get(self, request, number_machine):

        machine = Machine.objects.filter(number_machine=number_machine)
        machine_ids = machine.values_list('number_machine', flat=True)

        machine_data = MachineSerializer(machine, many=True)
        machine_fields = [field.verbose_name for field in Machine._meta.fields]

        complaint_data = ComplaintSerializer(Complaint.objects.filter(machine__in=machine_ids), many=True)
        complaint_fields = [field.verbose_name for field in Complaint._meta.fields]

        technical_maintenance_data = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.filter(machine__in=machine_ids), many=True)
        technical_maintenance_fields = [field.verbose_name for field in TechnicalMaintenance._meta.fields]

        return (Response({"machine_data": machine_data.data,
                          "machine_fields": machine_fields,
                          "complaint_data": complaint_data.data,
                          "complaint_fields": complaint_fields,
                          "technical_maintenance_data": technical_maintenance_data.data,
                          "technical_maintenance_fields": technical_maintenance_fields,
                          }

                         ))





@api_view(["GET"])
def information_for_create_mashine(request):
    model_technic = TechnicSerializer(Technic.objects.all(), many=True)
    model_engine = EngineSerializer(Engine.objects.all(), many=True)

    model_transmission = TransmissionSerializer(Transmission.objects.all(), many=True)

    model_driving_bridge = DrivingBridgeSerializer(DrivingBridge.objects.all(), many=True)

    model_controlled_bridge = ControlledBridgeSerializer(ControlledBridge.objects.all(), many=True)

    client = UserSerializer(User.objects.filter(groups__name="Client"), many=True)

    print(User.objects.filter(groups__name="Client"))



    service_company = ServiceCompanySerializer(ServiceCompany.objects.all(), many=True)

    return Response({
        "model_technic": model_technic.data,
        "model_engine": model_engine.data,
        "model_transmission": model_transmission.data,
        "model_driving_bridge": model_driving_bridge.data,
        "model_controlled_bridge": model_controlled_bridge.data,
        "client": client.data,
        "service_company": service_company.data
    })


class CreateMashine(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Machine.objects.all()

    def post(self, request):

        data = request.data

        number_machine = str(data["number_machine"])

        model_technic = Technic.objects.get(id=data["model_technic"])
        model_engine = Engine.objects.get(id=data["model_engine"])
        number_engine = str(data["number_engine"])
        model_transmission = Transmission.objects.get(id=data["model_transmission"])
        number_transmission = str(data["number_transmission"])

        model_driving_bridge = DrivingBridge.objects.get(id=data["model_driving_bridge"])
        number_driving_bridge = str(data["number_driving_bridge"])

        model_controlled_bridge = ControlledBridge.objects.get(id=data["model_controlled_bridge"])
        number_controlled_bridge = str(data["number_driving_bridge"])

        delivery_agreement = str(data["delivery_agreement"])

        date_shipment = datetime.strptime(data["date_shipment"], "%Y-%m-%d")

        end_user = str(data["end_user"])
        delivery_address = str(data["delivery_address"])

        equipment = str(data["Equipment"])

        client = User.objects.get(id=data["client"])

        service_company = ServiceCompany.objects.get(id=data["service_company"])


        new_machine = Machine ( number_machine=number_machine, model_technic=model_technic,
                                model_engine=model_engine, number_engine=number_engine,
                                model_transmission=model_transmission, number_transmission=number_transmission,
                                model_driving_bridge=model_driving_bridge, number_driving_bridge=number_driving_bridge,
                                model_controlled_bridge=model_controlled_bridge, number_controlled_bridge=number_controlled_bridge,
                                delivery_agreement=delivery_agreement, date_shipment=date_shipment, end_user=end_user,
                                delivery_address=delivery_address, Equipment=equipment,
                                client=client, service_company=service_company,)
        #new_complaint.date_failure = date_failure
        #new_complaint.operating_time = operating_time
        #new_complaint.description_failure = description_failure
        #new_complaint.used_parts = used_parts
        #new_complaint.date_restoration = date_restoration
        #new_complaint.downtime = downtime
        new_machine.save()

        return (Response({"data": "data"}
                         ))














@api_view(["GET"])
def get_csrf(request):
    response = JsonResponse({"X-CSRFToken": get_token(request)})
    return response
