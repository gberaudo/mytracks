from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.gis.db import models as gis_models

class Track(models.Model):
  class Meta:
     app_label = 'tracks'

  user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
  name = models.CharField(max_length=200)
  description = models.TextField(null=True, blank=True)
  profile = models.CharField(max_length=30)
  geojson = JSONField(default=None)
  line_geometry = gis_models.LineStringField(null=True, srid=3857)
