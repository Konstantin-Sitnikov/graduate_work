from rest_framework import serializers
from django.contrib.auth.models import User
from ..technic.views import MachineSerializer
from .models import FailureNode, RecoveryMethod, Complaint
from ..service_company.serializers import ServiceCompanySerializer

class FailureNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureNode
        fields = ('id', 'name', 'description')


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ('id', 'name', 'description')



class ComplaintSerializer(serializers.ModelSerializer):
    failure_node = FailureNodeSerializer()
    recovery_method = RecoveryMethodSerializer()
    machine =MachineSerializer()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Complaint
        fields = ('id', 'date_failure', 'operating_time', 'failure_node',
                  'description_failure', 'recovery_method', 'used_parts', 'date_restoration',
                  'downtime', 'machine', 'service_company'
                  )