from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, generics, filters
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Recipe
from .serializers import (
    RegistrationSerializer, UserSerializer,
    ProfileSerializer, RecipeSerializer
)


# Health endpoint
@api_view(['GET'])
def health(request):
    return Response({"message": "Server is up!"})


# PUBLIC_INTERFACE
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user.
    """
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# PUBLIC_INTERFACE
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Log in a user and return user info if valid.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        return Response(UserSerializer(user).data)
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


# PUBLIC_INTERFACE
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile(request):
    """
    Retrieve or update the user profile.
    GET: Get profile data.
    PUT: Update bio field.
    """
    profile = request.user.profile
    if request.method == 'GET':
        return Response(ProfileSerializer(profile).data)
    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# PUBLIC_INTERFACE
class RecipeListCreateView(generics.ListCreateAPIView):
    """
    List all recipes, create new recipe.
    GET: list/search.
    POST: add recipe (auth required).
    """
    queryset = Recipe.objects.all().order_by('-created_at')
    serializer_class = RecipeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'ingredients']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# PUBLIC_INTERFACE
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a recipe by ID.
    GET: recipe details.
    PUT/PATCH: update (owner only).
    DELETE: delete (owner only).
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_update(self, serializer):
        if self.request.user != self.get_object().created_by:
            return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        recipe = self.get_object()
        if request.user != recipe.created_by:
            return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
