from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegisterSerializer, UserLoginSerializer
from .models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

def getToken(User):
    genToken = RefreshToken.for_user(User)
    return {
        'refresh': str(genToken),
        'access': str(genToken.access_token)
    }

class RegisterView(APIView):
    def post(self, request):
        userData = request.data
        data = {
            'email': userData['email'],
            'name': userData['name'],
            'password': userData['password'],
            'avatar': "https://api.dicebear.com/6.x/pixel-art/svg?seed=" + userData['name'],
        }
        userRegisterSerializer = UserRegisterSerializer(data=data)
        if userRegisterSerializer.is_valid():
            savedUser = User.objects.create_user(**data)
            token = getToken(savedUser)
            return Response({'message': 'User created successfully', 'token': token, 'user': userRegisterSerializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': userRegisterSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request):
        serialize = UserLoginSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        email = serialize.data.get('email')
        password = serialize.data.get('password')
        try:
            account = get_object_or_404(User, email=email)
        except:
            return Response({'message' : 'Please register first'}, status=status.HTTP_404_NOT_FOUND)
        user = authenticate(email=email, password=password)
        if user:
            token = getToken(user)
            userSerializer = UserRegisterSerializer(user)
            return Response({'token' : token, 'message' : 'User logged in successfully', 'user' : userSerializer.data}, status=status.HTTP_200_OK)
        return Response({'message' : 'Invalid credentials, Please check again'}, status=status.HTTP_401_UNAUTHORIZED)
    
            
class Profile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        userProfile = get_object_or_404(User, pk=user.id)
        userSerializer = UserRegisterSerializer(userProfile)
        return Response({'message': 'User fetched successfully', 'user': userSerializer.data}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        user = request.user
        deletedUser = user.delete()
        return Response({'message' : 'User deleted successfully', 'user': deletedUser}, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        userSerializer = UserRegisterSerializer(user, data=request.data, partial=True)
        if userSerializer.is_valid():
            userSerializer.save()
            return Response({'message': 'User updated successfully', 'user': userSerializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'User update failed'}, status=status.HTTP_400_BAD_REQUEST)