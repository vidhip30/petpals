from rest_framework import permissions

from applications.models import Application

class IsUserOrShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow any logged-in user or shelter
        return request.user and request.user.is_authenticated

class CanCommentOnShelter(IsUserOrShelter):
    def has_object_permission(self, request, view, obj):
        # Allow any logged-in user or shelter to comment on a shelter
        return True
    
class CanListCommentsOnShelter(IsUserOrShelter):
    def has_permission(self, request, view):
        # Allow any logged-in user or shelter to see comments for a shelter
        return True

class CanCommentOnApplication(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated (logged in)
        if not request.user.is_authenticated:
            return False

        # Check if the user is a PetSeeker or Shelter tied to the application
        application_id = view.kwargs.get('application_id')
        try:
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return False

        # Check if the user is the PetSeeker or Shelter associated with the application
        return (
            request.user.id == application.user.id or
            request.user.id == application.pet_listing.shelter.id
        )
