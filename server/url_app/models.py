from django.db import models

class UrlModel(models.Model):
    url = models.CharField(max_length=255)
    uuid = models.CharField(max_length=5)
    users = models.ForeignKey('account_app.User', on_delete=models.CASCADE, related_name='users')

    def __str__(self):
        return self.url