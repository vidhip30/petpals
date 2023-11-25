from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import PetListing

class PetListingSerializer(ModelSerializer):
    shelter = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = PetListing
        fields = '__all__'
    