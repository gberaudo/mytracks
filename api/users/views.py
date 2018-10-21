from django.views import View
from rest_framework import generics

from . import models
from . import serializers
from . import users_permission
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseBadRequest


class UserListView(generics.ListCreateAPIView):
  permission_classes = (users_permission.UsersPermission,)
  queryset = models.CustomUser.objects.all()
  serializer_class = serializers.UserSerializer


def email_validation(request, user_id):
  user = get_object_or_404(models.CustomUser, pk=user_id)

  token = request.GET.get('token')

  if user.email_validate_token and user.email_validate_token == token:
    user.email_validate_token = None
    user.email_validated = True
    user.is_active = True
    user.save()
    return render(request, 'email_validation.html')
  return HttpResponseBadRequest('Bad token')
