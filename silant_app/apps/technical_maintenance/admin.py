from django.contrib import admin
from .models import TechnicalMaintenance, TypeTechnicalMaintenance

# Register your models here.
admin.site.register(TechnicalMaintenance)
admin.site.register(TypeTechnicalMaintenance)