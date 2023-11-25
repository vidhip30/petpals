from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from notifications.models import Notification
from notifications.permissions import NotificationPermission
from notifications.serializers import NotificationSerializer
from rest_framework.viewsets import ModelViewSet


# Only allow modifications that change read status to True.
def validate_update(request):
    if len(request.data) > 1:
        return JsonResponse({'detail': 'Prohibited action'}, status=403)

    if 'read' not in request.data or request.data.get('read') != True:
        return JsonResponse({'detail': 'Prohibited action'}, status=403)

    return None


class NotificationViewSet(ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [NotificationPermission]

    # Source:
    # https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-current-user
    def get_queryset(self):
        if self.action in ['update', 'partial_update']:
            return Notification.objects.all()

        notifications = Notification.objects.filter(
            user=self.request.user).order_by('-created_at')
        read = self.request.data.get('read')

        if read is not None:
            notifications = notifications.filter(read=read)

        return notifications

    @swagger_auto_schema(
        operation_summary='Create new notification for user',
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    # Source:
    # https://www.django-rest-framework.org/api-guide/generic-views/
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @swagger_auto_schema(
        operation_summary='List all notifications for current user',
    )
    def list(self, request, *args, **kwargs):
        if str(request.user.id) != kwargs['account_pk']:
            return JsonResponse({'detail': 'Not authorized'}, status=401)

        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Get notification by ID',
    )
    def retrieve(self, request, *args, **kwargs):
        if str(request.user.id) != kwargs['account_pk']:
            return JsonResponse({'detail': 'Not authorized'}, status=401)

        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Update notification to read',
    )
    def update(self, request, *args, **kwargs):
        if str(request.user.id) != kwargs['account_pk']:
            return JsonResponse({'detail': 'Not authorized'}, status=401)

        error_response = validate_update(request)

        if error_response:
            return error_response

        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Partially update notification to read',
    )
    def partial_update(self, request, *args, **kwargs):
        if str(request.user.id) != kwargs['account_pk']:
            return JsonResponse({'detail': 'Not authorized'}, status=401)

        error_response = validate_update(request)

        if error_response:
            return error_response

        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Delete notification',
    )
    def destroy(self, request, *args, **kwargs):
        if str(request.user.id) != kwargs['account_pk']:
            return JsonResponse({'detail': 'Not authorized'}, status=401)

        return super().destroy(request, *args, **kwargs)
