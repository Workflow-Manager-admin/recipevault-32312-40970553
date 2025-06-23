from django.urls import path
from .views import (
    health, register, login, profile,
    RecipeListCreateView, RecipeDetailView
)

urlpatterns = [
    path('health/', health, name='Health'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('profile/', profile, name='profile'),
    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
]
