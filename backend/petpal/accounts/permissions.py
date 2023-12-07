from accounts.models import Shelter
from rest_framework.permissions import BasePermission

# Source:
# https://stackoverflow.com/questions/19313314/django-rest-framework-viewset-per-action-permissions


def user_is_shelter(user) -> bool:
    try:
        Shelter.objects.get(username=user.username)
    except Shelter.DoesNotExist:
        return False

    return True


class SeekerPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True

        if view.action in ['partial_update', 'update', 'retrieve']:
            return request.user.is_authenticated

        return request.user.is_authenticated and request.user.is_superuser


class ShelterPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True

        if view.action in ['retrieve', 'list', 'partial_update', 'update']:
            return request.user.is_authenticated

        return request.user.is_authenticated and request.user.is_superuser
