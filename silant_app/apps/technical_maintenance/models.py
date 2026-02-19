from django.db import models
from ..technic.models import Machine
from ..service_company.models import ServiceCompany



class TypeTechnicalMaintenance(models.Model):
    class Meta:
        verbose_name = 'Тип технического обслуживания'
        verbose_name_plural = 'Типы технического обслуживания'


    name = models.CharField(unique=True, max_length=200, verbose_name = 'Название')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.name



class TechnicalMaintenance(models.Model):
    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Техническое обслуживание'

    type_technical_maintenance = models.ForeignKey(TypeTechnicalMaintenance, on_delete=models.CASCADE, verbose_name = 'Вид ТО') # Вид ТО

    date_maintenance = models.DateField(verbose_name = 'Дата проведения ТО') # Дата проведения ТО

    operating_time = models.PositiveIntegerField(default=0, verbose_name = 'Наработка, м/час') #

    order_number = models.CharField(unique=True, max_length=200, verbose_name = '№ заказ-наряда') #

    date_order_number = models.DateField(verbose_name = 'Дата заказ-наряда')  #

    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name = 'Машина')

    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name = 'Техническое обслуживание') # Сервисная компания

    def __str__(self):
        return (self.type_technical_maintenance.name +" "+ self.machine.model_technic.model)