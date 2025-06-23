from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Recipe


# PUBLIC_INTERFACE
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for base User (no password).
    """

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


# PUBLIC_INTERFACE
class RegistrationSerializer(serializers.ModelSerializer):
    """
    Registration serializer for User creation.
    """

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"]
        )
        Profile.objects.create(user=user)
        return user


# PUBLIC_INTERFACE
class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the Profile model.
    """

    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'bio']


# PUBLIC_INTERFACE
class RecipeSerializer(serializers.ModelSerializer):
    """
    Serializer for Recipe model CRUD.
    """

    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'description', 'ingredients',
            'instructions', 'created_by', 'created_at', 'updated_at'
        ]
