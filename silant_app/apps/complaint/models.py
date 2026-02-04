from django.db import models
from ..technic.models import Machine
from ..service_company.models import ServiceCompany



class FailureNode(models.Model):
    class Meta:
        verbose_name = 'Узел отказа'
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    class Meta:
        verbose_name = 'Способ восстановления'

    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name



class Complaint(models.Model):
    class Meta:
        verbose_name = 'Рекламация'

    id = models.ForeignKey(Machine, on_delete=models.CASCADE, primary_key=True)

    date_failure = models.DateField()  # Дата отказа

    operating_time = models.PositiveIntegerField(default=0)  # наработка, м/час

    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE) #узел отказа

    description_failure = models.TextField() # Описание отказа

    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE) # Способ восстановления

    used_parts = models.TextField() # используемые запчасти

    date_restoration = models.DateField() #Дата восстановления

    downtime = models.PositiveIntegerField(default=0) #Время простоя техники

    machine = models.CharField(max_length=200) # Машина

    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE) # Сервисная компания

    def __str__(self):
        return self.failure_node
