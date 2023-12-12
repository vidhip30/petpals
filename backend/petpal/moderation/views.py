from accounts.models import Shelter, User
from django.shortcuts import get_object_or_404
from moderation.models import Report
from moderation.permissions import ReportPermission
from moderation.serializers import ReportSerializer
from rest_framework.viewsets import ModelViewSet


# Create your views here.
class ReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [ReportPermission]

    def perform_create(self, serializer):
        data = self.request.data

        reporter = get_object_or_404(User, id=data['reporter_id'])
        reportee = get_object_or_404(Shelter, id=data['reportee_id'])

        serializer.save(reporter=reporter, reportee=reportee,
                        text=data['text'])
