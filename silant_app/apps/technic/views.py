
from django.middleware.csrf import get_token
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import DjangoModelPermissions
from .serializers import *
from ..service_company.serializers import ServiceCompanySerializer, ServiceCompany
from ..complaint.serializers import ComplaintSerializer
from ..complaint.models import Complaint



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

        machine = MachineSerializer(get_user_machine(user_id=user_id), many=True)


        #machine = MachineSerializer(Machine.objects.filter(client__id=user_id), many=True)
        fields = [field.verbose_name for field in Machine._meta.fields]

        return (Response({"data": machine.data,
                          "fields": fields}
                         ))




class MachineDetail(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Machine.objects.all()

    def get(self, request, number_machine):
        print(number_machine)
        machine = Machine.objects.get(number_machine=number_machine)
        machine_data =  MachineSerializer(machine)
        complaint = ComplaintSerializer(Complaint.objects.filter(machine=machine), many=True)

        return (Response({"machine": machine_data.data,
                          "complaint":complaint.data
                                  }
                                 ))




@api_view(["GET"])
def get_csrf(request):
    response = JsonResponse({"X-CSRFToken": get_token(request)})
    return response
