from accounts.models import Shelter, User
from django.db import models


class Report(models.Model):
    reporter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='reports_sent')
    reportee = models.ForeignKey(
        Shelter, on_delete=models.CASCADE, related_name='reports_received')
    text = models.CharField(max_length=255, null=False)
