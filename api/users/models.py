from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import ugettext_lazy as _
from api import settings


class CustomUserManager(BaseUserManager):
  """
  A custom user manager to deal with emails as unique identifiers for auth
  instead of usernames. It allows managing email validation as well.
  The default that's used is "UserManager"
  """

  def _create_user(self, email, password, **extra_fields):
    """
    Creates and saves a User with the given email and password.
    """
    if not email:
      raise ValueError('The Email must be set')
    email = self.normalize_email(email)
    user = self.model(email=email, username=email, **extra_fields)

    # User are inactive by default when created. Need to confirm email to activate
    user.is_active = False
    user.set_password(password)
    user.set_email_validate_token()
    user.save()
    self._send_validation_email(user)
    return user

  def create_superuser(self, email, password, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    extra_fields.setdefault('is_active', True)

    if extra_fields.get('is_staff') is not True:
      raise ValueError('Superuser must have is_staff=True.')
    if extra_fields.get('is_superuser') is not True:
      raise ValueError('Superuser must have is_superuser=True.')
    superuser = self.model(email=email, **extra_fields)
    superuser.set_password(password)
    superuser.save()
    return superuser

  def _send_validation_email(self, user: 'CustomUser'):
    from django.core.mail import send_mail
    link = '{api_url}/users/{id}/email_validation?token={token}'\
      .format(id=user.id, token=user.email_validate_token,api_url=settings.API_URL)
    html_message = '<div>' \
                   '<p>Please click on the following link to activate your account</p>' \
                   '<a href="{link}">{link}</a>' \
                   '</div>'
    html_message = html_message.format(link=link)
    send_mail('Activate your Mytracks account', '', settings.EMAIL_HOST_USER, [user.email],
              html_message=html_message)


class CustomUser(AbstractUser):
  email = models.EmailField(unique=True, null=False)
  email_validate_token = models.CharField(_('email_validate_token'), max_length=30, blank=True, null=True, unique=True)
  email_validated = models.BooleanField(default=False)
  username = models.CharField(max_length=30, blank=True, null=True)
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []
  objects = CustomUserManager()

  def __str__(self):
    return self.email

  def set_email_validate_token(self):
    from django.utils.crypto import get_random_string
    self.email_validate_token = get_random_string(30)
