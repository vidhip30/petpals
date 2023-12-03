from django.db import models
from accounts.models import Shelter

class PetListing(models.Model):
    AVAILABLE = 'available'
    ADOPTED = 'adopted'
    PENDING = 'pending'
    WITHDRAWN = 'withdrawn'    
    STATUS_CHOICES = (
        (AVAILABLE, "Available"),
        (ADOPTED, "Adopted"),
        (PENDING, "Pending"),
        (WITHDRAWN, "Withdrawn"),
    )

    MALE = 'male'
    FEMALE = 'female'  
    GENDER_CHOICES = (
        (MALE, "Male"),
        (FEMALE, "Female"),
    )
    shelter =  models.ForeignKey(Shelter, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS_CHOICES, max_length=255)
    breed = models.CharField(max_length=255,null=True,blank=True)
    name = models.CharField(max_length=255,null=True,blank=True)
    age = models.IntegerField(null=True,blank=True)
    size = models.IntegerField(null=True,blank=True)
    description = models.CharField(max_length=255,null=True,blank=True)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=255,null=True,blank=True)
    picture = models.ImageField(upload_to='pets/',null=True,blank=True)
