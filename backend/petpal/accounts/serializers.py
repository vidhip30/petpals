from accounts.models import PetSeeker, Shelter, User
from django.contrib.auth.hashers import make_password
from rest_framework.serializers import (CharField, ModelSerializer,
                                        ValidationError)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Sources:
# https://stackoverflow.com/questions/49189484/how-to-mention-password-field-in-serializer
# https://www.django-rest-framework.org/api-guide/serializers/#serializers


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'password_repeat', 'email',
                  'profile_image', 'location', 'phone_number']

    password = CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    password_repeat = CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    def validate(self, data):
        if data.get('password') != data.get('password_repeat'):
            raise ValidationError("Passwords don't match")

        return self.clean(data)

    def clean(self, data):
        if 'password_repeat' in data:
            del data['password_repeat']
            data['password'] = make_password(data.get('password'))

        return data


class ShelterSerializer(UserSerializer):
    class Meta():
        model = Shelter
        fields = UserSerializer.Meta.fields + ['name', 'mission_statement']


class PetSeekerSerializer(UserSerializer):
    class Meta():
        model = PetSeeker
        fields = UserSerializer.Meta.fields + ['first_name', 'last_name']


# Source: https://stackoverflow.com/a/76626345
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        data["user_id"] = user.id

        if Shelter.objects.filter(id=user.id).exists():
            data["user_type"] = "shelter"
        elif PetSeeker.objects.filter(id=user.id).exists():
            data["user_type"] = "seeker"

        return data
