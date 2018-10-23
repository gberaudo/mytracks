from rest_framework import generics, serializers, status
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

from . import models


class TrackSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Track
    fields = ('id', 'name', 'description', 'profile', 'geojson', 'user')


class SameUserOrAdminPermission(BasePermission):
  def has_permission(self, request, view):
    return request.user.is_superuser or request.user.id == view.kwargs.get('user_id')


class TrackListView(generics.ListCreateAPIView):
  queryset = models.Track.objects.all()
  serializer_class = TrackSerializer


class UserTracksView(generics.ListCreateAPIView):
  serializer_class = TrackSerializer
  permission_classes = (SameUserOrAdminPermission,)

  def get_queryset(self):
    userId = self.kwargs.get('user_id')
    return models.Track.objects.filter(user=userId)

  def post(self, request, user_id):
    request.data['user'] = user_id
    serializer = TrackSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
