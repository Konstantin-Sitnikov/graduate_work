from django.db import models
from django.contrib.auth.models import User




class ServiceCompany(models.Model):
    class Meta:
        verbose_name = 'Сервисную компанию'
        verbose_name_plural = 'Сервисные компании'

    name = models.CharField(unique=True, max_length=200, verbose_name = 'Название')
    description = models.CharField(max_length=400, verbose_name = 'Описание')
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, verbose_name = 'Клиент')

    def __str__(self):
        return self.name
