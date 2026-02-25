from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from ..service_company.serializers import ServiceCompanySerializer

class TechnicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technic
        fields = ('id', 'model', 'description')


class EngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engine
        fields = ('id', 'model', 'description')


class TransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transmission
        fields = ('id', 'model', 'description')



class DrivingBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivingBridge
        fields = ('id', 'model', 'description')



class ControlledBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlledBridge
        fields = ('id', 'model', 'description')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class MachineSerializer(serializers.ModelSerializer):
    model_technic = TechnicSerializer()
    model_engine = EngineSerializer()
    model_transmission = TransmissionSerializer()
    model_driving_bridge = DrivingBridgeSerializer()
    model_controlled_bridge = ControlledBridgeSerializer()
    client = UserSerializer()
    service_company = ServiceCompanySerializer()


    class Meta:
        model = Machine
        fields = ('number_machine', 'model_technic', 'model_engine', 'number_engine',
                  'model_transmission', 'number_transmission', 'model_driving_bridge',
                  'number_driving_bridge', 'model_controlled_bridge', 'number_controlled_bridge',
                  'delivery_agreement', 'date_shipment', 'end_user', 'delivery_address', 'Equipment',
                   "client", 'service_company'
                  )


class TableHeadersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
