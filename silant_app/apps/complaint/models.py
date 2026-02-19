from django.db import models
from ..technic.models import Machine
from ..service_company.models import ServiceCompany



class FailureNode(models.Model):
    class Meta:
        verbose_name = 'Узел отказа'
        verbose_name_plural = 'Узлы отказа'

    name = models.CharField(unique=True, max_length=200, verbose_name = 'Название')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    class Meta:
        verbose_name = 'Метод восстановления'
        verbose_name_plural = 'Методы восстановления'

    name = models.CharField(unique=True, max_length=200, verbose_name = 'Название')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.name



class Complaint(models.Model):
    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'

    date_failure = models.DateField(verbose_name = 'Дата отказа')

    operating_time = models.PositiveIntegerField(verbose_name = 'Наработка, м/час')

    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE, verbose_name = 'Узел отказа')

    description_failure = models.TextField(verbose_name = 'Описание отказа')

    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE, verbose_name = 'Способ восстановления')

    used_parts = models.TextField(verbose_name = 'Используемые запчасти')

    date_restoration = models.DateField(verbose_name = 'Дата восстановления')

    downtime = models.PositiveIntegerField(default=0, verbose_name = 'Время простоя техники')

    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name = 'Машина')

    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name = 'Сервисная компания')

    def __str__(self):
        return (self.machine.model_technic.model + " " + self.failure_node.name)
