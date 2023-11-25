from accounts.models import User
from django.db import models


def directory_path(instance, filename):
    return f"notification/{instance.user.id}/{filename}"


class Notification(models.Model):
    text = models.CharField(max_length=255, null=False)
    image = models.ImageField(upload_to=directory_path, null=True)
    link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
