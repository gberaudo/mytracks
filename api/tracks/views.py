from rest_framework import generics, serializers, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

from . import models


class TrackSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Track
    fields = ('id', 'name', 'description', 'profile', 'geojson', 'user', 'line_geometry')

  def update(self, instance, validated_data):
    instance.name = validated_data.get('name')
    instance.description = validated_data.get('description')
    instance.profile = validated_data.get('profile')
    instance.geojson = validated_data.get('geojson')
    instance.save()


class SameUserOrAdminPermission(BasePermission):
  def has_permission(self, request, view):
    return request.user.is_superuser or request.user.id == view.kwargs.get('user_id')


class IsAdminOrTrackOwner(BasePermission):
  def has_permission(self, request, view):
    is_owner = False
    track_id = view.kwargs.get('track_id')
    user_id = request.user.id
    try:
      track = models.Track.objects.get(id=track_id)
      if track.user_id == user_id:
        is_owner = True
    except:
      pass
    return request.user.is_superuser or is_owner


class TrackListView(generics.ListCreateAPIView):
  queryset = models.Track.objects.all()
  serializer_class = TrackSerializer


class UserTracksView(generics.ListCreateAPIView):
  serializer_class = TrackSerializer
  permission_classes = (SameUserOrAdminPermission,)

  def get_queryset(self):
    user_id = self.kwargs.get('user_id')
    return models.Track.objects.filter(user=user_id)

  def post(self, request, user_id):
    request.data['user'] = user_id
    serializer = TrackSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserOneTrackView(RetrieveUpdateDestroyAPIView):
  serializer_class = TrackSerializer
  permission_classes = (SameUserOrAdminPermission, IsAdminOrTrackOwner)

  def get(self, request, user_id, track_id):
    try:
      track = models.Track.objects.get(id=track_id)
      return Response(TrackSerializer(track).data)
    except models.Track.DoesNotExist:
      return Response(status=status.HTTP_404_BAD_REQUEST)


  def put(self, request, user_id, track_id):
    try:
      track = models.Track.objects.get(id=track_id)
      serializer = TrackSerializer(track)
      serializer.update(track, request.data)
      return Response(serializer.data)
    except models.Track.DoesNotExist:
      return Response(status=status.HTTP_404_BAD_REQUEST)

  def destroy(self, request, user_id, track_id):
    models.Track.objects.filter(id=track_id).delete()
    return Response()
