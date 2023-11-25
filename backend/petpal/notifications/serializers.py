from notifications.models import Notification
from rest_framework.serializers import DateTimeField, ModelSerializer


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = ['text', 'image', 'read', 'created_at', 'link']

    created_at = DateTimeField(
        read_only=True
    )
