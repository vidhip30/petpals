from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, CharField, ValidationError
from applications.models import Application

class CreateApplicationSerializer(ModelSerializer):
    pet_listing = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Application
        fields = ['pet_listing', 'address', 'phone_number', 'living_situation', 'ownership', 'occupation', 'number_of_pets', 'exercise_hours', 'alone_hours', 'adoption_reason']

class UpdateApplicationSerializer(ModelSerializer):

    class Meta:
        model = Application
        fields = ['status']

class GetApplicationSerializer(ModelSerializer):
    pet_listing = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'