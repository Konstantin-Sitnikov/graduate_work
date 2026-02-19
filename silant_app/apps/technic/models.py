from django.db import models
from django.contrib.auth.models import User
from ..service_company.models import ServiceCompany




class Technic(models.Model):
    class Meta:
        verbose_name = 'Технику'
        verbose_name_plural = 'Техника'

    model = models.CharField(unique=True, max_length=200, verbose_name = 'Модель')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.model


class Engine(models.Model):
    class Meta:
        verbose_name = 'Двигатель'
        verbose_name_plural = 'Двигатели'

    model = models.CharField(unique=True, max_length=200, verbose_name = 'Модель')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.model


class Transmission(models.Model):
    class Meta:
        verbose_name = 'Трансмиссию'
        verbose_name_plural = 'Трансмиссии'

    model = models.CharField(unique=True, max_length=200, verbose_name = 'Модель')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.model


class DrivingBridge(models.Model):
    class Meta:
        verbose_name = 'Ведущий мост'
        verbose_name_plural = 'Ведущие мосты'

    model = models.CharField(unique=True, max_length=200, verbose_name = 'Модель')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.model


class ControlledBridge(models.Model):
    class Meta:
        verbose_name = 'Управляемый мост'
        verbose_name_plural = 'Управляемые мосты'

    model = models.CharField(unique=True, max_length=200, verbose_name = 'Модель')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.model



class Machine(models.Model):
    class Meta:
        verbose_name = 'Машину'
        verbose_name_plural = 'Машины'


    number_machine = models.CharField(unique=True, max_length=200, primary_key=True, verbose_name = 'Зав. № машины')
    model_technic = models.ForeignKey(Technic, on_delete=models.CASCADE, verbose_name = 'Модель техники')

    model_engine = models.ForeignKey(Engine, on_delete=models.CASCADE, verbose_name = 'Модель двигателя') #
    number_engine = models.CharField(unique=True, max_length=200, verbose_name = 'Зав. № двигателя') #

    model_transmission = models.ForeignKey(Transmission, on_delete=models.CASCADE, verbose_name = 'Модель трансмиссии') #
    number_transmission = models.CharField(unique=True, max_length=200, verbose_name = 'Зав. № трансмиссии') #

    model_driving_bridge = models.ForeignKey(DrivingBridge, on_delete=models.CASCADE, verbose_name = 'Модель ведущего моста') #
    number_driving_bridge = models.CharField(unique=True, max_length=200, verbose_name = 'Зав. № ведущего моста') #

    model_controlled_bridge = models.ForeignKey(ControlledBridge, on_delete=models.CASCADE, verbose_name = 'Модель управляемого моста') #
    number_controlled_bridge = models.CharField(unique=True, max_length=200, verbose_name = 'Зав. № управляемого моста') #

    delivery_agreement = models.CharField(max_length=300, unique=True, verbose_name = 'Договор поставки №, дата') #

    date_shipment = models.DateField(verbose_name = 'Дата отгрузки с завода') #

    end_user = models.CharField(max_length=500, verbose_name = 'Конечный потребитель') #

    delivery_address = models.CharField(max_length=500, verbose_name = 'Адрес поставки') #

    Equipment = models.CharField(max_length=500, verbose_name = 'Комплектация') #

    client = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name = 'Клиент')

    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name = 'Сервисная компания')

    def __str__(self):
        return self.model_technic.model
