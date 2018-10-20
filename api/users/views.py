from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from . import models
from . import serializers
from . import users_permission


class UserListView(generics.ListCreateAPIView):
  permission_classes = (users_permission.UsersPermission,)
  queryset = models.CustomUser.objects.all()
  serializer_class = serializers.UserSerializer
