from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Complaint, FailureNode, RecoveryMethod
from .serializers import ComplaintSerializer,FailureNodeSerializer,RecoveryMethodSerializer


@api_view(["GET"])
def information_for_complaint(request):
    failure_node = FailureNodeSerializer(FailureNode.objects.all(), many=True)
    recovery_method = RecoveryMethodSerializer(RecoveryMethod.objects.all(), many=True)
    return Response({
        "failure_node": failure_node.data,
        "recovery_method": recovery_method.data
    })






# Create your views here.
@api_view(["GET"])
def complaint(request):
    if request.method == "GET":

        machine = ComplaintSerializer(Complaint.objects.all(), many=True)
        fields = [field.verbose_name for field in Complaint._meta.fields]

        return (Response({"data": machine.data,
                          "fields": fields}
                         ))




@api_view(["POST"])
def create_complaint(request):
    if request.method == "POST":
        #new_complaint = Complaint()
        #print(new_complaint)
        print(request.data)

        return (Response({"data":"data"}
                         ))