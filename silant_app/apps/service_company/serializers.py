from rest_framework import serializers
from .models import *

class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ('id', 'name', 'description')