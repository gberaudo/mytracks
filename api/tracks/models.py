from django.db import models
from django.contrib.postgres.fields import JSONField

class Track(models.Model):
  user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
  name = models.CharField(max_length=200)
  description = models.TextField(null=True, blank=True)
  profile = models.CharField(max_length=30)
  geojson = JSONField(default=None)
