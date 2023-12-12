from accounts.models import Shelter, User
from django.shortcuts import get_object_or_404
from moderation.models import Report
from rest_framework.serializers import ModelSerializer


class ReportSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'reporter_id', 'reportee_id', 'text']

    def to_representation(self, instance):
        result = super().to_representation(instance)
        reporter = get_object_or_404(User, id=result['reporter_id'])

        result['reporter_name'] = reporter.first_name + \
            " " + reporter.last_name
        result['reportee_name'] = get_object_or_404(
            Shelter, id=result['reportee_id']).name

        return result
