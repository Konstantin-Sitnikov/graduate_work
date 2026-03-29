
from django.middleware.csrf import get_token
from django.http import JsonResponse
from datetime import datetime
from django.db import IntegrityError

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import DjangoModelPermissions
from rest_framework import status
from .serializers import *
from ..users.serializers import UserSerializer, User
from ..service_company.serializers import ServiceCompanySerializer, ServiceCompany
from ..complaint.serializers import ComplaintSerializer
from ..complaint.models import Complaint

from ..technical_maintenance.serializers import TechnicalMaintenanceSerializer
from ..technical_maintenance.models import TechnicalMaintenance



@api_view(["GET"])
def reference_books_machines(request):
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



class Machines(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Machine.objects.all()

    def get(self, request, user_id, user_group):
        user = User.objects.get(id=user_id)

        if (user_group == "Manager"):
            machine = Machine.objects.all()

        elif (user_group == "Service_company"):
            service_company_id = user.servicecompanyprofile.service_company.id
            machine = Machine.objects.filter(service_company__id=service_company_id)

        else:
            machine = Machine.objects.filter(client__id=user_id)

        machine_ids = machine.values_list('number_machine', flat=True)
        machine_data = MachineSerializer(machine, many=True)
        complaint_data = ComplaintSerializer(Complaint.objects.filter(machine__in=machine_ids), many=True)
        technical_maintenance_data = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.filter(machine__in=machine_ids), many=True)


        return Response({"machine_data": machine_data.data,
                         "complaint_data": complaint_data.data,
                         "technical_maintenance_data": technical_maintenance_data.data,}
                         )




class MachineDetail(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Machine.objects.all()

    def get(self, request, number_machine):

        machine = Machine.objects.filter(number_machine=number_machine)
        machine_ids = machine.values_list('number_machine', flat=True)

        machine_data = MachineSerializer(machine, many=True)

        complaint_data = ComplaintSerializer(Complaint.objects.filter(machine__in=machine_ids), many=True)

        technical_maintenance_data = TechnicalMaintenanceSerializer(TechnicalMaintenance.objects.filter(machine__in=machine_ids), many=True)


        return Response({"machine_data": machine_data.data,
                          "complaint_data": complaint_data.data,
                          "technical_maintenance_data": technical_maintenance_data.data})

class SearchMachine(APIView):
    def get(self, request, number_machine):

        machine = Machine.objects.filter(number_machine=number_machine)
        machine_data = MachineSerializer(machine, many=True)


        return Response({"machine_data": machine_data.data,})






class CreateMachine(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Machine.objects.all()

    def post(self, request):

        data = request.data
        print(data)

        number_machine = str(data["number_machine"])

        model_technic = Technic.objects.get(id=data["model_technic"])
        model_engine = Engine.objects.get(id=data["model_engine"])
        number_engine = str(data["number_engine"])
        model_transmission = Transmission.objects.get(id=data["model_transmission"])
        number_transmission = str(data["number_transmission"])

        model_driving_bridge = DrivingBridge.objects.get(id=data["model_driving_bridge"])
        number_driving_bridge = str(data["number_driving_bridge"])

        model_controlled_bridge = ControlledBridge.objects.get(id=data["model_controlled_bridge"])
        number_controlled_bridge = str(data["number_controlled_bridge"])

        delivery_agreement = str(data["delivery_agreement"])

        date_shipment = datetime.strptime(data["date_shipment"], "%Y-%m-%d")

        end_user = str(data["end_user"])
        delivery_address = str(data["delivery_address"])

        equipment = str(data["Equipment"])

        client = User.objects.get(id=data["client"])

        service_company = ServiceCompany.objects.get(id=data["service_company"])

        try:
            if ((not Machine.objects.filter(number_machine=number_machine).exists()) and data['type_post'] == 'create'):

                    new_machine = Machine ( number_machine=number_machine, model_technic=model_technic,
                                            model_engine=model_engine, number_engine=number_engine,
                                            model_transmission=model_transmission, number_transmission=number_transmission,
                                            model_driving_bridge=model_driving_bridge, number_driving_bridge=number_driving_bridge,
                                            model_controlled_bridge=model_controlled_bridge, number_controlled_bridge=number_controlled_bridge,
                                            delivery_agreement=delivery_agreement, date_shipment=date_shipment, end_user=end_user,
                                            delivery_address=delivery_address, Equipment=equipment,
                                            client=client, service_company=service_company,)

                    new_machine.save()

                    return Response(data={"message": f"Машина номером {number_machine} сохранена в базу данных"},status=status.HTTP_201_CREATED)


            elif ((Machine.objects.filter(number_machine=number_machine).exists()) and data['type_post'] == 'update'):
                update_machine = Machine.objects.get(number_machine=number_machine)
                update_machine.model_technic = model_technic
                update_machine.model_engine = model_engine
                update_machine.number_engine = number_engine
                update_machine.model_transmission = model_transmission
                update_machine.number_transmission = number_transmission
                update_machine.model_driving_bridge = model_driving_bridge
                update_machine.number_driving_bridge = number_driving_bridge
                update_machine.model_controlled_bridge = model_controlled_bridge
                update_machine.number_controlled_bridge = number_controlled_bridge
                update_machine.delivery_agreement = delivery_agreement
                update_machine.date_shipment = date_shipment
                update_machine.end_user = end_user
                update_machine.delivery_address = delivery_address
                update_machine.Equipment=equipment
                update_machine.client = client
                update_machine.service_company = service_company

                update_machine.save()
                return (Response(data={"message": f"Данные о машине номером {number_machine} обновлены"},
                                 status=status.HTTP_201_CREATED
                             ))
            else:
                return (Response(data={"message": "Машина с таким номером уже есть в базе данных"},status=status.HTTP_400_BAD_REQUEST
                             ))
        except IntegrityError as error:
            error_message = ""

            if "number_engine" in str(error):
                error_message = "Двигатель с таким номером уже существует"
            elif "number_transmission" in str(error):
                error_message = "Трансмиссия с таким номером уже существует"
            elif "number_driving_bridge" in str(error):
                error_message = "Ведущий мост с таким номером уже существует"
            elif "number_controlled_bridge" in str(error):
                error_message = "Управляемый мост с таким номером уже существует"


            return Response(data={"message": error_message}, status=status.HTTP_501_NOT_IMPLEMENTED)












@api_view(["GET"])
def get_csrf(request):
    response = JsonResponse({"X-CSRFToken": get_token(request)})
    return response
