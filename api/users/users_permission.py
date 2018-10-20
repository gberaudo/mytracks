from rest_framework import permissions
class UsersPermission(permissions.BasePermission):
  def has_permission(self, request, view):
        # allow all POST requests
        if request.method == 'POST':
            return True

        return request.user.is_superuser
