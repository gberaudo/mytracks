from django.http import HttpResponseBadRequest, HttpRequest
from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import json
from api import settings

from . import models
from . import serializers
from . import users_permission

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

def _send_password_recovery_email(email, token):
  from django.core.mail import send_mail
  link = '{api_url}/users/password_recovery_form?token={token}'\
    .format(token=token,api_url=settings.API_URL)
  html_message = '<div>' \
                  '<p>Please click on the following link to recover your account</p>' \
                  '<a href="{link}">{link}</a>' \
                  '</div>'
  html_message = html_message.format(link=link)
  send_mail('Recover your Mytracks account', '', settings.EMAIL_HOST_USER, [email],
            html_message=html_message)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_recovery_request(request):
  print('recovering')
  data = json.loads(request.body.decode("utf-8"))
  email = data['email']
  print('email', email)

  user = get_object_or_404(models.CustomUser, email=email)

  user.set_password_recovery_token()
  user.save()
  # Send email with recovery token
  token = user.password_recovery_token
  _send_password_recovery_email(email, token)
  return Response()


@api_view(['GET'])
@permission_classes([AllowAny])
def password_recovery_form(request):
  token = request.GET.get('token')
  get_object_or_404(models.CustomUser, password_recovery_token=token)

  return render(request, 'password_recovery_form.html', {
    'token': token
  })


@api_view(['POST'])
@permission_classes([AllowAny])
def password_recovery_validation(request):
  token = request.POST.get('token')
  password = request.POST.get('password')
  print('xx', token, password)
  user = get_object_or_404(models.CustomUser, password_recovery_token=token)
  user.set_password(password)
  user.password_recovery_token = None
  user.save()
  return Response({'ok': True})