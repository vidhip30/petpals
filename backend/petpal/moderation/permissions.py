from rest_framework.permissions import BasePermission


class ReportPermission(BasePermission):
    def has_permission(self, request, view):
        # Reports are create-only for regular users.
        if view.action == 'create':
            return request.user.is_authenticated

        return request.user.is_authenticated and request.user.is_superuser
