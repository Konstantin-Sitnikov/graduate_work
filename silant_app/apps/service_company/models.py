from django.db import models

class ServiceCompany(models.Model):
    class Meta:
        verbose_name = 'Сервисную компанию'
        verbose_name_plural = 'Сервисные компании'

    name = models.CharField(unique=True, max_length=200, verbose_name = 'Название')
    description = models.CharField(max_length=400, verbose_name = 'Описание')

    def __str__(self):
        return self.name
