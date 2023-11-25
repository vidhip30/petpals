from accounts.models import PetSeeker, Shelter
from applications.models import Application
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from applications.serializers import CreateApplicationSerializer, UpdateApplicationSerializer, GetApplicationSerializer
from petListings.models import PetListing
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from drf_yasg.utils import swagger_auto_schema


# Create your views here.
class CustomPaginator(PageNumberPagination):
    page_size = 10
    page_query_param = "page"
    page_size_query_param = "page_size"


class ApplicationsCreate(CreateAPIView):
    serializer_class = CreateApplicationSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary='Create applications by pet listing ID',
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        pet_listing = get_object_or_404(
            PetListing, id=self.kwargs['listing_id'])
        if pet_listing.status != 'available':
            raise PermissionDenied(detail="This pet listing is not available")
        elif PetSeeker.objects.filter(user_ptr=self.request.user).exists():
            serializer.save(pet_listing=pet_listing, user=self.request.user)
        else:
            PermissionDenied('You are not a pet seeker')


class ApplicationsUpdate(UpdateAPIView):
    
    serializer_class = UpdateApplicationSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary='Update application status by ID',
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    def get_object(self):
        application = get_object_or_404(Application, id=self.kwargs['pk'])
        shelter = application.pet_listing.shelter
        pet_seeker = application.user

        if not Shelter.objects.filter(user_ptr = self.request.user, pk = shelter.pk).exists():
            if not PetSeeker.objects.filter(user_ptr = self.request.user, pk = pet_seeker.pk).exists():
                raise PermissionDenied("You must be either the pet seeker or shelter associated with the application to update it")

        return application

    def perform_update(self, serializer):

        shelter = serializer.instance.pet_listing.shelter
        pet_seeker = serializer.instance.user
        status = serializer.validated_data['status']
        if Shelter.objects.filter(user_ptr=self.request.user, pk=shelter.pk).exists():
            if serializer.instance.status != 'pending':
                raise PermissionDenied(
                    detail="You cannot switch a non-pending application")
            elif status != 'accepted' and status != 'denied':
                raise PermissionDenied(
                    "Shelter can only switch it to accepted or denied!")
        elif PetSeeker.objects.filter(user_ptr=self.request.user, pk=pet_seeker.pk).exists():
            if serializer.instance.status != 'pending' and serializer.instance.status != 'accepted':
                raise PermissionDenied(
                    detail="You cannot switch an application that is not pending and not accepted")
            elif status != 'withdrawn':
                raise PermissionDenied(
                    "Pet Seeker can only switch it to withdrawn")
        else:
            raise PermissionDenied(
                "You are neither the associated pet seeker nor the shelter!")

        return super().perform_update(serializer)


class ApplicationsList(ListAPIView):

    serializer_class = GetApplicationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPaginator

    @swagger_auto_schema(
        operation_summary='List applications based on status filter and creation time/update time ordering',
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):

        status = self.request.GET.get('status')
        sort_by = self.request.GET.getlist('sort_by')

        shelter = get_object_or_404(Shelter, user_ptr=self.request.user)

        applications = Application.objects.all().filter(pet_listing__shelter=shelter)

        if status and (status == 'accepted' or status == 'denied' or status == 'pending' or status == 'withdrawn'):
            applications = applications.filter(status=status)

        sort_by_val = []
        if 'updated_at' in sort_by:
            sort_by_val.append('updated_at')

        if 'created_at' in sort_by:
            sort_by_val.append('created_at')

        applications = applications.order_by(*sort_by_val)

        return applications

class GetApplication(RetrieveAPIView):

    serializer_class = GetApplicationSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary='Get application by ID',
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    def get_object(self):
        application = get_object_or_404(Application, id=self.kwargs['pk'])
        shelter = application.pet_listing.shelter
        pet_seeker = application.user
        if not Shelter.objects.filter(user_ptr = self.request.user, pk = shelter.pk).exists():
            if not PetSeeker.objects.filter(user_ptr = self.request.user, pk = pet_seeker.pk).exists():
                raise PermissionDenied("You must be either the pet seeker or shelter associated with the application")

        return application
