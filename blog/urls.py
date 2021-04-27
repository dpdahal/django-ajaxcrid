from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('students', views.get_students),
    path('delete', views.delete_student),
    path('insert', views.insert),
    path('get_single_student/<id>', views.get_single_student),
    path('update', views.update)

]
