# Register your models here.
from django.contrib import admin
from .models import Recipe, Profile


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created_by", "created_at", "updated_at")
    search_fields = ("title", "description", "ingredients")
    list_filter = ("created_by", "created_at", "updated_at")


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "bio")
    search_fields = ("user__username", "bio")
