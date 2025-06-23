from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Recipe


class HealthTests(APITestCase):

    def test_health(self):
        url = reverse('Health')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {"message": "Server is up!"})


class AuthProfileTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='tester', password='testpass', email='t@t.com'
        )

    def test_register(self):
        url = reverse('register')
        payload = {'username': 'newuser', 'password': 'newpass123', 'email': 'n@n.com'}
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['username'], 'newuser')

    def test_login_success(self):
        url = reverse('login')
        payload = {'username': 'tester', 'password': 'testpass'}
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'tester')

    def test_login_failure(self):
        url = reverse('login')
        payload = {'username': 'tester', 'password': 'wrong'}
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_profile_retrieve(self):
        self.client.login(username='tester', password='testpass')
        url = reverse('profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'], 'tester')

    def test_profile_update(self):
        self.client.login(username='tester', password='testpass')
        url = reverse('profile')
        response = self.client.put(url, {'bio': 'Loves recipes'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bio'], 'Loves recipes')


class RecipeAPITests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='chef', password='chefpass')
        self.client = APIClient()
        self.recipe = Recipe.objects.create(
            title="Pasta", description="Yummy",
            ingredients="noodles\ntomato sauce", instructions="Cook pasta. Add sauce.",
            created_by=self.user
        )

    def test_recipe_list(self):
        url = reverse('recipe-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)

    def test_recipe_create_unauthenticated(self):
        url = reverse('recipe-list-create')
        payload = {
            'title': 'Soup', 'description': 'Good',
            'ingredients': 'water\nvegetables', 'instructions': 'Boil.'
        }
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, 403)

    def test_recipe_create_authenticated(self):
        self.client.login(username='chef', password='chefpass')
        url = reverse('recipe-list-create')
        payload = {
            'title': 'Pizza', 'description': 'Cheesy',
            'ingredients': 'dough\ncheese', 'instructions': 'Bake.'
        }
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['title'], 'Pizza')
        self.assertEqual(response.data['created_by']['username'], 'chef')

    def test_recipe_detail(self):
        url = reverse('recipe-detail', kwargs={'pk': self.recipe.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'Pasta')

    def test_recipe_update_owner(self):
        self.client.login(username='chef', password='chefpass')
        url = reverse('recipe-detail', kwargs={'pk': self.recipe.pk})
        payload = {
            'title': 'Better Pasta', 'description': 'Yummier',
            'ingredients': 'noodles\ntomato', 'instructions': 'Cook. Add.'
        }
        response = self.client.put(url, payload, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'Better Pasta')

    def test_recipe_update_not_owner(self):
        User.objects.create_user(username='nope', password='nopass')
        self.client.login(username='nope', password='nopass')
        url = reverse('recipe-detail', kwargs={'pk': self.recipe.pk})
        payload = {
            'title': 'Stolen Pasta', 'description': 'Fake',
            'ingredients': 'stuff', 'instructions': 'Do stuff.'
        }
        response = self.client.put(url, payload, format='json')
        self.assertEqual(response.status_code, 403)

    def test_recipe_delete_owner(self):
        self.client.login(username='chef', password='chefpass')
        url = reverse('recipe-detail', kwargs={'pk': self.recipe.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)

    def test_recipe_delete_not_owner(self):
        User.objects.create_user(username='nope', password='nopass')
        self.client.login(username='nope', password='nopass')
        url = reverse('recipe-detail', kwargs={'pk': self.recipe.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 403)

    def test_recipe_search(self):
        url = f"{reverse('recipe-list-create')}?search=pasta"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)
