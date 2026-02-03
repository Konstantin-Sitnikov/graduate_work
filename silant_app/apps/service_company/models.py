from django.db import models

class ServiceCompany(models.Model):
    name = models.CharField(unique=True, max_length=200)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name
