from rest_framework import serializers
from .models import UrlModel

class UrlModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlModel
        fields = '__all__'