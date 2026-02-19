from django.shortcuts import render


from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *



@api_view(["GET"])
def information_machines(request):
    technic = TechnicSerializer(Technic.objects.all(), many=True)
    engine = EngineSerializer(Engine.objects.all(), many=True)
    transmission = TransmissionSerializer(Transmission.objects.all(), many=True)
    driving_bridge = DrivingBridgeSerializer(DrivingBridge.objects.all(), many=True)
    controlled_bridge = ControlledBridgeSerializer(ControlledBridge.objects.all(), many=True)
    user = UserSerializer(User.objects.all(), many=True)

    return (Response({"model_technic": technic.data,
                      "model_engine": engine.data,
                      "model_transmission":transmission.data,
                      "model_driving_bridge":driving_bridge.data,
                      "model_controlled_bridge": controlled_bridge.data,
                      "client": user.data,
                      }))


@api_view(["GET"])
def machines(request):
    if request.method == "GET":

        machine = MachineSerializer(Machine.objects.all(), many=True)
        fields = [field.verbose_name for field in Machine._meta.fields]

        return (Response({"machine": machine.data,
                          "fields": fields}
                         ))


