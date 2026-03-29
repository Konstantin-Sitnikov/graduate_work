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
from apps.technic.views import Machines, MachineDetail, CreateMachine, reference_books_machines,get_csrf, SearchMachine
from apps.technical_maintenance.views import reference_books_technical_maintenance, CreateTechnicalMaintenance,TechnicalMaintenancetDetail
from apps.complaint.views import CreateComplaint, ComplaintDetail,  reference_books_complaint
from apps.users.views import Users


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/machines/<int:user_id>/<str:user_group>/', Machines.as_view()),
    path('api/machine_detail/<str:number_machine>/', MachineDetail.as_view()),
    path('api/reference_books_machines/', reference_books_machines),
    path('api/create_machine/', CreateMachine.as_view()),
    path('api/machine_search/<str:number_machine>/', SearchMachine.as_view()),



    path('api/complaint_detail/<str:number_complaint>/', ComplaintDetail.as_view()),
    path('api/create_complaint/', CreateComplaint.as_view()),
    path('api/reference_books_complaint/', reference_books_complaint),

    path('api/technical_maintenance_detail/<str:number_technical_maintenance>/', TechnicalMaintenancetDetail.as_view()),
    path('api/create_technical_maintenance/', CreateTechnicalMaintenance.as_view()),
    path('api/reference_books_technical_maintenance/', reference_books_technical_maintenance),

    path('csrf/', get_csrf),
    path('api/get_user/<int:user_id>', Users.as_view()),

    path('accounts/', include('allauth.urls')),
    path("_allauth/", include("allauth.headless.urls")),
]
