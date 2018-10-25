from django.urls import path

from tracks.views import UserTracksView, UserOneTrackView
from . import views

urlpatterns = [
  path('', views.UserListView.as_view()),
  path('<int:user_id>/email_validation/', views.email_validation),
  path('<int:user_id>/tracks', UserTracksView.as_view()), # allow user to access easily to his tracks
  path('<int:user_id>/tracks/<int:track_id>', UserOneTrackView.as_view()), # allow user to access easily to his tracks

]
