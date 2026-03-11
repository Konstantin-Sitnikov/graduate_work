from django.contrib import admin
from .models import ServiceCompany, ServiceCompanyProfile

# Register your models here.
admin.site.register(ServiceCompany)

admin.site.register(ServiceCompanyProfile)