from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Complaint
from .serializers import ComplaintSerializer



# Create your views here.
@api_view(["GET"])
def complaint(request):
    if request.method == "GET":

        machine = ComplaintSerializer(Complaint.objects.all(), many=True)
        fields = [field.verbose_name for field in Complaint._meta.fields]

        return (Response({"data": machine.data,
                          "fields": fields}
                         ))