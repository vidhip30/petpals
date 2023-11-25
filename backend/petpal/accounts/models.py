from django.db.models import ImageField, CharField, TextField, EmailField
from django.contrib.auth.models import AbstractUser


def user_directory_path(instance, filename):
    return f"profile/user_{instance.id}/{filename}"


class User(AbstractUser):
    email = EmailField(blank=False, max_length=150)
    first_name = CharField(blank=False, max_length=30)
    last_name = CharField(blank=False, max_length=30)

    profile_image = ImageField(upload_to=user_directory_path, null=True)
    location = CharField(max_length=255, blank=True, null=True)
    phone_number = CharField(max_length=15, blank=True, null=True)


class Shelter(User):
    name = CharField(max_length=255, blank=False, null=False)
    mission_statement = TextField(blank=True, null=True)


class PetSeeker(User):
    pass
