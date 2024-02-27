from django.contrib import admin
from .models import UrlModel

@admin.register(UrlModel)
class UrlShortnerAdmin(admin.ModelAdmin):
    class Meta:
        model = UrlModel
        fields = '__all__'