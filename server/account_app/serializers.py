from .models import User
from rest_framework import serializers

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'avatar']
        extra_kwargs={
      'password':{'write_only':True}
    }
        
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
      model = User
      fields = ['email', 'password']