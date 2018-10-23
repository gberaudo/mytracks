from . import models

from rest_framework import generics, serializers

class TrackSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Track
    fields = ('id', 'name', 'description', 'profile', 'geojson')

class TrackListView(generics.ListCreateAPIView):
  queryset = models.Track.objects.all()
  serializer_class = TrackSerializer


