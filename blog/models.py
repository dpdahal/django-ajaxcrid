from django.db import models


# Create your models here.

class Students(models.Model):
    full_name = models.CharField(max_length=120)
    email = models.CharField(max_length=120)
    address = models.TextField(max_length=255)
