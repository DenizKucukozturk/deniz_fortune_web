from django.urls import path
from . import views

urlpatterns = [
    path('', views.fortune_views),
]