from datetime import datetime

from notifications.models import Notification
from rest_framework.serializers import DateTimeField, ModelSerializer


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'text', 'image', 'read', 'created_at', 'link']

    created_at = DateTimeField(
        read_only=True
    )

    # Source: https://stackoverflow.com/questions/65916066/how-to-format-time-into-readable-format-in-django
    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Make human-readable.
        date = datetime.fromisoformat(
            data["created_at"].replace('Z', '+00:00'))
        data["created_at"] = date.strftime("%I:%M %p %b %d, %Y")

        return data
