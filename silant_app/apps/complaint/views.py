from platform import machine

from django.shortcuts import render
from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Complaint, FailureNode, RecoveryMethod, ServiceCompany
from .serializers import ComplaintSerializer,FailureNodeSerializer,RecoveryMethodSerializer, ServiceCompanySerializer
from ..technic.models import Machine



@api_view(["GET"])
def information_for_complaint(request):
    failure_node = FailureNodeSerializer(FailureNode.objects.all(), many=True)
    recovery_method = RecoveryMethodSerializer(RecoveryMethod.objects.all(), many=True)
    service_company = ServiceCompanySerializer(ServiceCompany.objects.all(), many=True)

    return Response({
        "failure_node": failure_node.data,
        "recovery_method": recovery_method.data,
        "service_company": service_company.data
    })


# Create your views here.
@api_view(["GET"])
def complaint(request, user_id):
    if request.method == "GET":
        complaint = ComplaintSerializer(Complaint.objects.filter(machine__client__id=user_id), many=True)
        fields = [field.verbose_name for field in Complaint._meta.fields]
        return (Response({"data": complaint.data,
                          "fields": fields}
                         ))




@api_view(["POST"])
def create_complaint(request):
    if request.method == "POST":
        data = request.data
        date_failure = datetime.strptime(data["date_failure"], "%Y-%m-%dT%H:%M")
        operating_time = int(data["operating_time"])
        failure_node = FailureNode.objects.get(id=data["failure_node"])
        description_failure = data["description_failure"]
        recovery_method = RecoveryMethod.objects.get(id=data["recovery_method"])
        used_parts = data["used_parts"]
        date_restoration = datetime.strptime(data["date_restoration"], "%Y-%m-%dT%H:%M")
        downtime = (date_restoration - date_failure).total_seconds()/60/60
        service_company = ServiceCompany.objects.get(id=data["service_company"])
        mashine = Machine.objects.get(number_machine=data["machine"])


        new_complaint = Complaint(failure_node=failure_node, recovery_method=recovery_method, service_company=service_company, machine=mashine)
        new_complaint.date_failure = date_failure
        new_complaint.operating_time = operating_time
        new_complaint.description_failure = description_failure
        new_complaint.used_parts = used_parts
        new_complaint.date_restoration = date_restoration
        new_complaint.downtime = downtime
        new_complaint.save()

        return (Response({"data":"data"}
                         ))