"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from apps.technic import views as machines
from apps.technical_maintenance import views as technical_maintenance
from apps.complaint import views as complaint


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/machines/', machines.machines),
    path('api/information_machines/', machines.information_machines),
    path('api/technical_maintenance/', technical_maintenance.technical_maintenance),
    path('api/complaint/', complaint.complaint),
    path('api/information_technical_maintenance/', technical_maintenance.information_technical_maintenance),

    path('csrf/', machines.get_csrf),

    path('accounts/', include('allauth.urls')),

    path("_allauth/", include("allauth.headless.urls")),
]
