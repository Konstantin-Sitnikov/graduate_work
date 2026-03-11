from django.db import models
from django.contrib.auth.models import User




class ServiceCompany(models.Model):
    class Meta:
        verbose_name = 'Сервисную компанию'
        verbose_name_plural = 'Сервисные компании'

    name = models.CharField(unique=True, max_length=200, verbose_name = 'Название')
    description = models.CharField(max_length=400, verbose_name = 'Описание')
    def __str__(self):
        return self.name




class ServiceCompanyProfile(models.Model):
    class Meta:
        verbose_name = 'Профиль СК'
        verbose_name_plural = 'Профили СК'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.SET_NULL, null=True, blank=True, related_name="employees")

    def __str__(self):
        return f"{self.service_company} - {self.user}"