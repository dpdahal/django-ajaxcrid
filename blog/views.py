from django.shortcuts import render, HttpResponse, redirect

from .models import Students
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from django.core import serializers


# Create your views here.

def index(request):
    return render(request, 'index.html')


def get_students(request):
    rooms = list(Students.objects.all().values())
    data = dict()
    data['rooms'] = rooms
    return JsonResponse(data)


@csrf_exempt
def delete_student(request):
    if request.method == "POST":
        id = request.POST.get('id')
        Students.objects.get(id=id).delete()
        return HttpResponse("success")
    else:
        return redirect('/')


@csrf_exempt
def insert(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        address = request.POST.get('address')
        Students.objects.create(full_name=name, email=email, address=address)
        return HttpResponse("success")
    else:
        return redirect('/')


def get_single_student(request, id):
    data = Students.objects.get(id=id)
    myData = {'id': data.id, 'full_name': data.full_name, 'email': data.email, 'address': data.address}
    return JsonResponse(myData)


@csrf_exempt
def update(request):
    if request.method == "POST":
        id = request.POST.get('id')
        name = request.POST.get('name')
        email = request.POST.get('email')
        address = request.POST.get('address')
        obj = Students.objects.get(id=id)
        obj.full_name = name
        obj.email = email
        obj.address = address
        obj.save()
        return HttpResponse("success")
    else:
        return redirect('/')
