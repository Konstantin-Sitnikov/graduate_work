from django.db import IntegrityError
from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import DjangoModelPermissions
from rest_framework import status
from .models import Complaint, FailureNode, RecoveryMethod, ServiceCompany
from .serializers import ComplaintSerializer,FailureNodeSerializer,RecoveryMethodSerializer, ServiceCompanySerializer
from ..technic.models import Machine



@api_view(["GET"])
def reference_books_complaint(request):
    failure_node = FailureNodeSerializer(FailureNode.objects.all(), many=True)
    recovery_method = RecoveryMethodSerializer(RecoveryMethod.objects.all(), many=True)
    service_company = ServiceCompanySerializer(ServiceCompany.objects.all(), many=True)

    return Response({
        "failure_node": failure_node.data,
        "recovery_method": recovery_method.data,
        "service_company": service_company.data
    })




class CreateComplaint(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Complaint.objects.all()

    def post(self, request):
        data = request.data
        print(data)
        date_failure = datetime.strptime(data["date_failure"], "%Y-%m-%dT%H:%M")
        operating_time = int(data["operating_time"])
        failure_node = FailureNode.objects.get(id=data["failure_node"])
        description_failure = data["description_failure"]
        recovery_method = RecoveryMethod.objects.get(id=data["recovery_method"])
        used_parts = data["used_parts"]
        if (data["date_restoration"]):
            date_restoration = datetime.strptime(data["date_restoration"], "%Y-%m-%dT%H:%M")
            downtime = (date_restoration - date_failure).total_seconds() / 60 / 60

        service_company = ServiceCompany.objects.get(id=data["service_company"])
        mashine = Machine.objects.get(number_machine=data["machine"])
        if ( not ("id" in data) and data["type_post"] == "create"):

            new_complaint = Complaint(failure_node=failure_node, recovery_method=recovery_method,
                                      service_company=service_company, machine=mashine)
            new_complaint.date_failure = date_failure
            new_complaint.operating_time = operating_time
            new_complaint.description_failure = description_failure
            new_complaint.used_parts = used_parts
            if (data["date_restoration"]):
                new_complaint.date_restoration = date_restoration
                new_complaint.downtime = downtime
            new_complaint.save()

            return Response(data={"message": f"Рекламация сохранена в базу данных"},status=status.HTTP_201_CREATED)


        if (("id" in data) and data["type_post"] == "update"):
            update_complaint = Complaint.objects.get(id=data["id"])
            update_complaint.failure_node=failure_node
            update_complaint.recovery_method=recovery_method
            update_complaint.operating_time = operating_time
            update_complaint.description_failure = description_failure
            update_complaint.used_parts = used_parts
            if (data["date_restoration"]):
                update_complaint.date_restoration = date_restoration
                update_complaint.downtime = downtime

            update_complaint.service_company=service_company
            update_complaint.save()
            return Response(data={"message": f"Рекламация изменена"},status=status.HTTP_201_CREATED)



class ComplaintDetail(APIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Complaint.objects.all()

    def get(self, request, number_complaint):

        compl = Complaint.objects.get(id=number_complaint)
        complaint = ComplaintSerializer(compl)



        return (Response({"complaint_data": complaint.data,}

                         ))