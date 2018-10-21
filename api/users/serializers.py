from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.CustomUser
    fields = ('email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    return models.CustomUser.objects._create_user(**validated_data)
