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

# Create your views here.
class Users(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = User.objects.all()

    def get(self, request, user_id):

        user = User.objects.get(id=user_id)
        current_user = UserSerializer(user)

        if (user.groups.filter(name="Manager").exists()):
            user_group = "Manager"
        elif (user.groups.filter(name="Service_company").exists()):
            user_group = "Service_company"
        else:
            user_group = "Client"

        return Response({"current_user": current_user.data,
                         "user_group": user_group})