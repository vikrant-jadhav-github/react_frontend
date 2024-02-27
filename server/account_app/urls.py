from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view()),   
    path('login/', views.Login.as_view()), 
    path('profile/', views.Profile.as_view()),
]