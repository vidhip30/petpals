from django.db import models
from accounts.models import Shelter, PetSeeker
from applications.models import Application

from django.db import models

# Either petseeker or shelter will be filled out depending on if the comment poster is a petseeker or a shelter
class Comment(models.Model):
    petseeker = models.ForeignKey(PetSeeker, on_delete=models.CASCADE, null=True, blank=True)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='shelters', null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # shelter_review is the shelter the comment is left on, say the comment is a review on a shelter
    shelter_review = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    # submitted_application_followup is the application the comment is left on, if it is a comment left on an application
    submitted_application_followup = models.ForeignKey(Application, on_delete=models.CASCADE, null=True, blank=True)
    stars = models.IntegerField(null=True, blank=True, choices=[(1, '1 star'), (2, '2 stars'), (3, '3 stars'), (4, '4 stars'), (5, '5 stars')])
