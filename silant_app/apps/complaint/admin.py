from django.contrib import admin
from .models import FailureNode, RecoveryMethod, Complaint


# Register your models here.

admin.site.register(FailureNode)
admin.site.register(RecoveryMethod)
admin.site.register(Complaint)


