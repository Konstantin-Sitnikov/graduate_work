from django.db import models
from ..service_company.models import ServiceCompany

class ModelTechnic(models.Model):
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class ModelEngine(models.Model):
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class ModelTransmission(models.Model):
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class ModelDrivingBridge(models.Model):
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class ModelControlledBridge(models.Model):
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class User(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name





class Machine(models):
    number_machine = models.CharField(unique=True, max_length=200) # Зав. № машины
    model_technic = models.ForeignKey(ModelTechnic, on_delete=models.CASCADE) # Модель техники

    model_engine = models.ForeignKey(ModelEngine, on_delete=models.CASCADE) # Модель двигателя
    number_engine = models.CharField(unique=True, max_length=200) # Зав. № двигателя

    model_transmission = models.ForeignKey(ModelTransmission, on_delete=models.CASCADE) # Модель трансмиссии
    number_transmission = models.CharField(unique=True, max_length=200) # Зав. № трансмиссии

    model_driving_bridge = models.ForeignKey(ModelDrivingBridge, on_delete=models.CASCADE) # Модель ведущего моста
    number_driving_bridge = models.CharField(unique=True, max_length=200) # Зав. № ведущего моста

    model_controlled_bridge = models.ForeignKey(ModelControlledBridge, on_delete=models.CASCADE) # Модель управляемого моста
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
