
from django.contrib import admin
from .models import Doctor, Patient, Prescription, Ward, Cabin, Support

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'sex', 'dob', 'email', 'phone', "speciality", "department"]

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'sex', 'dob', 'email', 'phone']

# @admin.register(Prescription)
# class PrescriptionAdmin(admin.ModelAdmin):
#     list_display = ['doctor_name', 'doctor_email', 'patient_name', 'patient_number', 'patient_email', 'description', 'age', 'sex', 'date']

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ['ward_no', 'floor_no', 'booked_by', 'email', 'total_days', 'total_bill', 'booked_date', 'ward_type']

@admin.register(Cabin) 
class CabinAdmin(admin.ModelAdmin):
    list_display = ['cabin_no', 'floor_no', 'booked_by', 'email', 'total_days', 'total_bill', 'booked_date', 'cabin_type']
    
@admin.register(Support)
class SupportAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'message']

