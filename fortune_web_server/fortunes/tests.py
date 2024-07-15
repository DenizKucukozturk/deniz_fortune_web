from .models import Fortune
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status


class TestGetFortune(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/fortune/"

    def test_get_fortune__happy_path(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("id", response.data)
        self.assertIn("text", response.data)


class TestAddFortune(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/fortune/add"

    def test_add_fortune__happy_path(self):
        data = {
            "text": "Test fortune quote"
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("id", response.data)
        fortune_id = response.data["id"]
        fortune_object = Fortune.objects.get(id=fortune_id)

        self.assertEqual(fortune_object.text, "Test fortune quote")

    def test_add_fortune__invalid_input_missing_field(self):
        data = {
            "quote": "Test fortune quote"
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "Invalid input")

    def test_add_fortune__invalid_input_empty_text(self):
        data = {
            "text": ""
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "Invalid input")

