from django.db import models
from petListings.models import PetListing
from accounts.models import User

class Application(models.Model):

    HOUSE = 'house'
    APARTMENT = 'apartment'
    CONDO = 'condo'
    LIVING_CHOICES = (
        (HOUSE, "house"),
        (APARTMENT, "apartment"),
        (CONDO, "condo"),
    )

    OWN = 'own'
    RENT = 'rent'
    OWNERSHIP_CHOICES = (
        (OWN, "own"),
        (RENT, "rent"),
    )

    ACCEPTED = 'accepted'
    DENIED = 'denied'
    PENDING = 'pending'
    WITHDRAWN = 'withdrawn'    
    STATUS_CHOICES = (
        (ACCEPTED, "accepted"),
        (DENIED, "denied"),
        (PENDING, "pending"),
        (WITHDRAWN, "withdrawn"),
    )

    pet_listing = models.ForeignKey(PetListing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, null=False)
    phone_number = models.CharField(max_length=255, null=False)
    living_situation = models.CharField(choices=LIVING_CHOICES, max_length=255)
    ownership = models.CharField(choices=OWNERSHIP_CHOICES, max_length=255)
    occupation = models.CharField(max_length=255, null=False)
    number_of_pets = models.PositiveIntegerField()
    exercise_hours = models.PositiveIntegerField()
    alone_hours = models.PositiveIntegerField()
    adoption_reason = models.CharField(max_length=255, null=False)
    status = models.CharField(choices=STATUS_CHOICES, max_length=255, default=PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

