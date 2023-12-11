from django.forms import DateTimeField
from django.http import Http404
from rest_framework import serializers
from accounts.models import PetSeeker, Shelter
from accounts.serializers import PetSeekerSerializer, ShelterSerializer
from applications.models import Application
from comments.models import Comment


class CommentSerializerReview(serializers.ModelSerializer):
    petseeker = PetSeekerSerializer(required=False)
    shelter = ShelterSerializer(required=False)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Comment
        fields = ('content', 'created_at', 'shelter_review','stars', 'petseeker', 'shelter')


    def create(self, validated_data):
        shelter_id = self.context['request'].parser_context['kwargs']['shelter_id']
        try:
            shelter = Shelter.objects.get(pk=shelter_id)
        except Shelter.DoesNotExist:
            raise Http404("Shelter does not exist")

        validated_data['shelter_review'] = shelter
        return super().create(validated_data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)

        if data.get('stars') is None:
            del data['stars']
        if data.get('petseeker') is None:
            del data['petseeker']  # Remove 'petseeker' field if it's null
        elif data.get('shelter') is None:
            del data['shelter'] # Same for 'shelter' field
        return data
    
class CommentSerializerApplication(serializers.ModelSerializer):
    petseeker = PetSeekerSerializer(required=False)
    shelter = ShelterSerializer(required=False)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Comment
        fields = ('content', 'created_at', 'submitted_application_followup', 'petseeker', 'shelter')

    def create(self, validated_data):
        application_id = self.context['request'].parser_context['kwargs']['application_id']
        try:
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            raise Http404("Application does not exist")

        validated_data['submitted_application_followup'] = application
        return super().create(validated_data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data.get('petseeker') is None:
            del data['petseeker'] # Remove 'petseeker' field if it's null
        elif data.get('shelter') is None:
            del data['shelter'] # Same for 'shelter' field
        return data