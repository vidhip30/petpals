from django.utils import timezone
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework import pagination
from rest_framework.viewsets import ModelViewSet
from accounts.models import Shelter
from applications.models import Application
from drf_yasg.utils import swagger_auto_schema
from comments.models import Comment
from comments.permissions import CanCommentOnApplication, CanCommentOnShelter, CanListCommentsOnShelter
from comments.serializers import CommentSerializerApplication, CommentSerializerReview


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class ShelterCommentsView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializerReview
    permission_classes = [CanCommentOnShelter, CanListCommentsOnShelter]
    pagination_class = CustomPagination

    def get_queryset(self):
        shelter_id = self.kwargs.get('shelter_id')  # Extract shelter ID from URL
        queryset = Comment.objects.filter(shelter_review=shelter_id).order_by('-created_at')
        return queryset
    
    @swagger_auto_schema(
        operation_summary='Create a comment under a shelter',
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            if request.user.petseeker:
                serializer.validated_data['petseeker'] = request.user.petseeker
        except:
            if request.user.shelter:
                serializer.validated_data['shelter'] = request.user.shelter

        serializer.save()  # The 'shelter_review' assignment is handled within the serializer
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @swagger_auto_schema(
        operation_summary='List comments under a shelter',
    )
    def list(self, request, *args, **kwargs):
        shelter_id = self.kwargs.get('shelter_id')  # Get the shelter_id from URL
        try:
            shelter = Shelter.objects.get(pk=shelter_id)
        except Shelter.DoesNotExist:
            raise Http404("Shelter does not exist")

        page = self.paginate_queryset(self.get_queryset())
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    
class ApplicationCommentsView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializerApplication
    permission_classes = [CanCommentOnApplication]
    pagination_class = CustomPagination

    def get_queryset(self):
        application_id = self.kwargs.get('application_id')  # Extract application ID from URL
        queryset = Comment.objects.filter(submitted_application_followup=application_id).order_by('-created_at')
        return queryset
    
    @swagger_auto_schema(
        operation_summary='Create a comment under an application',
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        application_id = self.kwargs.get('application_id')

        # Update the last_modified field of the associated application
        try:
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return Http404("Application does not exist")
        
        application.updated_at = timezone.now() 
        application.save()

        try:
            if request.user.petseeker:
                serializer.validated_data['petseeker'] = request.user.petseeker
        except:
            if request.user.shelter:
                serializer.validated_data['shelter'] = request.user.shelter

        serializer.save()  # The 'submitted_application_followup' assignment is handled within the serializer
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @swagger_auto_schema(
        operation_summary='List comments under an application',
    )
    def list(self, request, *args, **kwargs):
        application_id = self.kwargs.get('application_id')  # Get the shelter_id from URL
        try:
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            raise Http404("Application does not exist")

        page = self.paginate_queryset(self.get_queryset())
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)

