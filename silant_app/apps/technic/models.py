from django.db import models
from django.contrib.auth.models import User
from ..service_company.models import ServiceCompany

class Technic(models.Model):
    class Meta:
        verbose_name = 'Техника'
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class Engine(models.Model):
    class Meta:
        verbose_name = 'Двигатель'
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class Transmission(models.Model):
    class Meta:
        verbose_name = 'Трансмиссия'
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class DrivingBridge(models.Model):
    class Meta:
        verbose_name = 'Ведущий мост'
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class ControlledBridge(models.Model):
    class Meta:
        verbose_name = 'Управляемый мост'
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name



class Machine(models.Model):
    class Meta:
        verbose_name = 'Машина'

    number_machine = models.CharField(unique=True, max_length=200, primary_key=True) # Зав. № машины
    model_technic = models.ForeignKey(Technic, on_delete=models.CASCADE) # Модель техники

    model_engine = models.ForeignKey(Engine, on_delete=models.CASCADE) # Модель двигателя
    number_engine = models.CharField(unique=True, max_length=200) # Зав. № двигателя

    model_transmission = models.ForeignKey(Transmission, on_delete=models.CASCADE) # Модель трансмиссии
    number_transmission = models.CharField(unique=True, max_length=200) # Зав. № трансмиссии

    model_driving_bridge = models.ForeignKey(DrivingBridge, on_delete=models.CASCADE) # Модель ведущего моста
    number_driving_bridge = models.CharField(unique=True, max_length=200) # Зав. № ведущего моста

    model_controlled_bridge = models.ForeignKey(ControlledBridge, on_delete=models.CASCADE) # Модель управляемого моста
    number_controlled_bridge = models.CharField(unique=True, max_length=200) # Зав. № управляемого моста

    delivery_agreement = models.CharField(max_length=300) # Договор поставки №, дата

    date_shipment = models.DateField() # Дата отгрузки с завода

    end_user = models.CharField(max_length=500) #конечный потребитель

    delivery_address = models.CharField(max_length=500) # Адрес поставки

    Equipment = models.CharField(max_length=500) # Комплектация

    client = models.ForeignKey(User, on_delete=models.CASCADE)

    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)

    def __str__(self):
        return self.model_technic
