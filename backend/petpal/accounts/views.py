from accounts.models import PetSeeker, Shelter
from accounts.permissions import SeekerPermission, ShelterPermission
from accounts.serializers import PetSeekerSerializer, ShelterSerializer
from applications.models import Application
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin,
                                   RetrieveModelMixin, UpdateModelMixin)
from rest_framework.viewsets import GenericViewSet, ModelViewSet

# Source:
# https://www.django-rest-framework.org/api-guide/viewsets/#viewset


class ShelterViewSet(ModelViewSet):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    permission_classes = [ShelterPermission]

    @swagger_auto_schema(
        operation_summary='Create shelter account',
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='List all shelters',
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Get shelter by ID',
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Update details of shelter account',
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Partially update details of shelter account',
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Delete shelter account',
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class PetSeekerViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = PetSeeker.objects.all()
    serializer_class = PetSeekerSerializer
    permission_classes = [SeekerPermission]

    @swagger_auto_schema(
        operation_summary='Create pet seeker account',
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Find pet seeker by ID',
    )
    def retrieve(self, request, *args, **kwargs):
        seeker = get_object_or_404(PetSeeker, id=kwargs.get('pk'))

        # Request to retrieve must be for a seeker
        # with an active application for the logged-in shelter.
        user_apps_with_shelter = Application.objects.filter(
            user=seeker,
            status='pending',
            pet_listing__shelter=request.user,
        )

        if not user_apps_with_shelter:
            return JsonResponse({'detail': 'Not authorized'}, status=401)

        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Update details of pet seeker account',
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Partially update details of pet seeker account',
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Delete pet seeker account',
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
