from accounts.models import Shelter
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import (CreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from .models import PetListing
from .serializers import PetListingSerializer


class CustomPaginator(PageNumberPagination):
    page_size = 10
    page_query_param = "page"
    page_size_query_param = "page_size"


class PetListingsCreate(CreateAPIView):
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary='Create pet listing by shelter ID',
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        shelter = get_object_or_404(Shelter, id=self.kwargs['pk'])
        if self.request.user.username != shelter.username:
            raise PermissionDenied(
                detail="You do not have permission to create this pet listing.")
        else:
            serializer.save(shelter=shelter)


class PetListingsList(ListAPIView):
    serializer_class = PetListingSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPaginator

    @swagger_auto_schema(
        operation_summary='List pet listings based on search filters and ordering',
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        shelter_id = self.request.GET.getlist('shelter')
        search = self.request.GET.getlist('search')
        status = self.request.GET.get('status')
        breed = self.request.GET.get('breed')
        gender = self.request.GET.get('gender')
        sort_by = self.request.GET.getlist('sort_by')
        listings = PetListing.objects.all()

        if search:
            listings = listings.filter(name__icontains=search) | listings.filter(
                breed__icontains=search)
        if shelter_id:
            shelter = Shelter.objects.filter(pk__in=shelter_id)
            if shelter:
                listings = listings.filter(shelter__in=shelter)
        if status and status in ['adopted', 'pending', 'withdrawn']:
            listings = listings.filter(status=status)
        elif status == 'all':
            pass
        else:
            listings = listings.filter(status='available')

        if breed:
            listings = listings.filter(breed=breed)
        if gender and gender in ['female', 'male']:
            listings = listings.filter(gender=gender)
        if sort_by:
            sort_by_val = []
            for s in sort_by:
                if s in ['name', 'age', 'size']:
                    sort_by_val.append(s)
            listings = listings.order_by(*sort_by_val)

        return listings


class ListingsRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary='Get petlisting by ID',
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_object(self):
        return get_object_or_404(PetListing, id=self.kwargs['pk'])

    @swagger_auto_schema(
        operation_summary='Update pet listing by ID',
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Partially update pet listing by ID',
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def perform_update(self, serializer):
        if self.request.user.username != serializer.instance.shelter.username:
            raise PermissionDenied(
                detail="You do not have permission to update this pet listing.")
        else:
            return super().perform_update(serializer)

    @swagger_auto_schema(
        operation_summary='Delete pet listing by ID',
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

    def perform_destroy(self, instance):
        if self.request.user.username != instance.shelter.username:
            raise PermissionDenied(
                detail="You do not have permission to delete this pet listing.")
        return super().perform_destroy(instance)
