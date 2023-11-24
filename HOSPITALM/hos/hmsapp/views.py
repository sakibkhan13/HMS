from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import transaction
from datetime import datetime
from .models import Doctor
from .models import Patient
from .models import Prescription
from .models import Ward
from .models import Cabin
from .serializers import DoctorSerializer
from .serializers import PatientSerializer
from .serializers import PrescriptionSerializer
from .serializers import WardInfoSerializer
from .serializers import CabinInfoSerializer
from .models import Support
from .serializers import SupportSerializer
from .models import BloodDonors
from .serializers import BloodDonorsSerializer
from .models import BloodAvailability, BloodDonors
from .serializers import BloodAvailabilitySerializer, BloodDonorsSerializer
from .models import BloodDonors, BloodRecipient, BloodAvailability
from .serializers import BloodDonorsSerializer, BloodRecipientSerializer

@api_view(['POST'])
def doctor_signup(request):
    if request.method == 'POST':
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data.get('email', '')
            phone = request.data.get('phone', '')
            if Doctor.objects.filter(email=email).exists():
                return Response({'email': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            if Doctor.objects.filter(phone=phone).exists():
                return Response({'phone': 'Phone number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def doctor_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        doctor = get_object_or_404(Doctor, email=email, password=password)
    except Doctor.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    serializer = DoctorSerializer(doctor)
    return Response(serializer.data)

@api_view(['POST'])
def patient_signup(request):
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data.get('email', '')
            phone = request.data.get('phone', '')
            if Patient.objects.filter(email=email).exists():
                return Response({'email': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            if Patient.objects.filter(phone=phone).exists():
                return Response({'phone': 'Phone number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def patient_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        patient = get_object_or_404(Patient, email=email, password=password)
    except Patient.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    serializer = PatientSerializer(patient)
    return Response(serializer.data)


@api_view(['GET'])
def get_doctor_by_email(request):
    email = request.GET.get('email')
    doctor = get_object_or_404(Doctor, email=email)
    serializer = DoctorSerializer(doctor)
    return Response(serializer.data)

@api_view(['GET'])
def get_patient_by_email(request):
    email = request.GET.get('email')
    patient = get_object_or_404(Patient, email=email)
    serializer = PatientSerializer(patient)
    return Response(serializer.data)

@api_view(['POST'])
def create_prescription(request):
    serializer = PrescriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_patient_prescriptions(request):
    patient_email = request.GET.get('patient_email')
    doctor_identifier = request.GET.get('doctor_identifier', '') 
    if '@' in doctor_identifier:  
        prescriptions = Prescription.objects.filter(patient_email=patient_email, doctor_email__icontains=doctor_identifier)
    else:
        prescriptions = Prescription.objects.filter(patient_email=patient_email, doctor_name__icontains=doctor_identifier)
    serializer = PrescriptionSerializer(prescriptions, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_doctor_prescriptions(request):
    doctor_email = request.GET.get('doctor_email')
    patient_identifier = request.GET.get('patient_identifier', '') 
    if '@' in patient_identifier:  
        prescriptions = Prescription.objects.filter(doctor_email=doctor_email, patient_email__icontains=patient_identifier)
    else:
        prescriptions = Prescription.objects.filter(doctor_email=doctor_email, patient_name__icontains=patient_identifier)
    serializer = PrescriptionSerializer(prescriptions, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_doctor_profile(request):
    email = request.data.get('email')
    try:
        doctor = get_object_or_404(Doctor, email=email)
    except Doctor.DoesNotExist:
        return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(doctor, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'message': 'Doctor profile updated successfully'})
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def create_support(request):
    serializer = SupportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'Support submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_available_wards(request):
    wards = Ward.objects.filter(booked_by=None)
    serializer = WardInfoSerializer(wards, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_available_cabins(request):
    cabins = Cabin.objects.filter(booked_by=None)
    serializer = CabinInfoSerializer(cabins, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@transaction.atomic
def book_ward(request):
    data = request.data
    ward_no = data.get('wardNo')
    booked_date = datetime.strptime(data.get('bookedDate'), '%Y-%m-%d').date()  
    try:
        ward = Ward.objects.get(ward_no=ward_no, booked_by=None)
        ward.booked_by = data.get('name')
        ward.email = data.get('email')
        ward.total_days = int(data.get('totalDays'))
        ward.total_bill = ward.total_days * 1100  
        ward.booked_date = booked_date 
        return Response({'message': 'Ward booked successfully.', 'ward_no': ward_no})
    except Ward.DoesNotExist:
        return Response({'detail': 'Ward not available or already booked.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def book_cabin(request):
    data = request.data
    cabin_no = data.get('cabinNo')
    booked_date = datetime.strptime(data.get('bookedDate'), '%Y-%m-%d').date()  
    try:
        cabin = Cabin.objects.get(cabin_no=cabin_no, booked_by=None)
        cabin.booked_by = data.get('name')
        cabin.email = data.get('email')
        cabin.total_days = int(data.get('totalDays'))
        cabin_type = cabin.cabin_type
        if cabin_type == 'Single':
            cabin.total_bill = cabin.total_days * 2000
        elif cabin_type == 'Double':
            cabin.total_bill = cabin.total_days * 2500
        cabin.booked_date = booked_date  
        cabin.save()
        return Response({'message': 'Cabin booked successfully.', 'cabin_no': cabin_no})
    except Cabin.DoesNotExist:
        return Response({'detail': 'Cabin not available or already booked.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_patient_ward_bills(request):
    patient_email = request.GET.get('patient_email')
    ward_bills = Ward.objects.filter(email=patient_email, booked_by__isnull=False)
    serializer = WardInfoSerializer(ward_bills, many=True)
    serialized_data = serializer.data
    return Response(serialized_data)

@api_view(['GET'])
def get_patient_cabin_bills(request):
    patient_email = request.GET.get('patient_email')
    cabin_bills = Cabin.objects.filter(email=patient_email, booked_by__isnull=False)
    serializer = CabinInfoSerializer(cabin_bills, many=True)
    serialized_data = serializer.data
    return Response(serialized_data)


#####
