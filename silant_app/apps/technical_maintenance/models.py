from django.db import models
from ..technic.models import Machine
from ..service_company.models import ServiceCompany



class TypeTechnicalMaintenance(models.Model):
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name



class TechnicalMaintenance(models.Model):

    id = models.ForeignKey(Machine, on_delete=models.CASCADE, primary_key=True)

    type_technical_maintenance = models.ForeignKey(TypeTechnicalMaintenance, on_delete=models.CASCADE) # Вид ТО

    date_maintenance = models.DateField() # Дата проведения ТО

    operating_time = models.PositiveIntegerField(default=0) #наработка, м/час

    order_number = models.CharField(unique=True, max_length=200) # № заказ-наряда

    date_order_number = models.DateField()  # Дата заказ-наряда

    machine = models.CharField(max_length=200)

    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE) # Сервисная компания

    def __str__(self):
        return self.type_technical_maintenance