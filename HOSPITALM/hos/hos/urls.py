"""
URL configuration for hos project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path ,include
from hmsapp import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('hmsapp.urls')),
    path('api/doctors/signup/', views.doctor_signup, name='doctor-signup'),
    path('api/doctor/login/', views.doctor_login,name='doctor_login'),
    path('api/patients/signup/', views.patient_signup, name='patient-signup'),
    path('api/patient/login/', views.patient_login,name='patient_login'),
    path('api/get_doctor_by_email/', views.get_doctor_by_email, name='get_doctor_by_email'),
    path('api/get_patient_by_email/', views.get_patient_by_email, name='get_patient_by_email'),
    path('api/prescriptions/', views.create_prescription, name='create_prescription'),
    path('api/patient/prescriptions/', views.get_patient_prescriptions, name='get_patient_prescriptions'),
    path('api/doctors/update-profile/', views.update_doctor_profile, name='update-doctor-profile'),
    path('api/doctors/', views.get_all_doctors, name='get-all-doctors'),
    path('api/available-wards/',views.get_available_wards, name='available-wards'),
    path('api/book-ward/', views.book_ward, name='book-ward'),
    path('api/patient/ward-bills/', views.get_patient_ward_bills, name='get-patient-ward-bills'),
    path('api/available-cabins/', views.get_available_cabins, name='available-cabins'),
    path('api/book-cabin/',views. book_cabin, name='book-cabin'),
    path('api/patient/cabin-bills/', views.get_patient_cabin_bills, name='get-patient-cabin-bills'),
    path('api/doctor/prescriptions/', views.get_doctor_prescriptions, name='get_doctor_prescriptions'),
    path('api/patients/', views.get_patients, name='get_patients'),
    path('api/patient-blood-details/', views.patient_blood_details, name='patient-blood-details'),
    # path('api/get-doctor-info/<str:department>/', views.get_doctor_info, name='get-doctor-info'),
    path('api/departments/', views.get_departments, name='get-departments'),
    path('api/create-support/', views.create_support, name='create-support'),
    path('api/get-doctor-info/<str:department>/', views.get_doctor_info, name='get_doctor_info'),
    path('api/blood-donors/', views.blood_donors_signup, name='blood_donors_signup'),
    # path('api/blood-donors-list/', views.get_blood_donors, name='get_blood_donors'),
    path('blood-availability/', views.get_blood_availability, name='blood-availability'),
    path('blood-donors/signup/', views.blood_donors_signup, name='blood-donors-signup'),
    path('api/blood-donors/', views.get_blood_donors, name='get_blood_donors'),
    # path('api/blood-recipients/', views.get_blood_recipients, name='get_blood_recipients'),
    # path('api/blood-availability/', views.get_blood_availability, name='get_blood_availability'),
    path('api/blood-recipient-request/', views.blood_recipient_request, name='blood_recipient_request'),
     path('api/get-test-charge/', views.get_test_charge, name='get-test-charge'),
     path('api/test-bill/', views.create_test_bill, name='create-test-bill'),
     path('api/test-bills/', views.get_test_bills, name='get_test_bills'),

]
    
    


    
    




   



 
    
   

