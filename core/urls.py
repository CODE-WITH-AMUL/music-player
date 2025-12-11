from django.urls import path
from .views import SongsViewSet , PlayListSongsViewSet , AlbumsViewSet



urlpatterns = [
    path('songs/', SongsViewSet.as_view(), name='songs'),
    path('playlists/', PlayListSongsViewSet.as_view(), name='playlists'),
    path('albums/', AlbumsViewSet.as_view(), name='albums'),
]
