from django.db import models
from django.contrib.auth.models import User


# PUBLIC_INTERFACE
class Profile(models.Model):
    """
    Extends the built-in User model to add additional profile data.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, default='')

    def __str__(self):
        return f"Profile of {self.user.username}"


# PUBLIC_INTERFACE
class Recipe(models.Model):
    """
    Stores recipe information.
    """
    title = models.CharField(max_length=255)
    description = models.TextField()
    ingredients = models.TextField(help_text="List ingredients, one per line.")
    instructions = models.TextField(help_text="Recipe instructions.")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
