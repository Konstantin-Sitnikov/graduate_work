from rest_framework import serializers
from .models import TechnicalMaintenance, TypeTechnicalMaintenance
from ..technic.serializers import MachineSerializer


class TypeTechnicalMaintenanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypeTechnicalMaintenance
        fields = ('id','name', 'description')


class TechnicalMaintenanceSerializer(serializers.ModelSerializer):
    date_maintenance=serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = TechnicalMaintenance
        fields = ('id','type_technical_maintenance', 'date_maintenance', 'operating_time', 'order_number',
                  'date_order_number', 'machine', 'service_company')





