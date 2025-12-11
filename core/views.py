from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Song, Albums, Playlist
from .serializers import SongSerializer, AlbumsSerializer, PlaylistSerializer

# Songs API
class SongsViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        songs = Song.objects.all().order_by('-created_at')
        serializer = SongSerializer(songs, many=True, context={'request': request})
        return Response(serializer.data)  # DRF Response handles JSON

# Playlists API
class PlayListSongsViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        playlists = Playlist.objects.all().order_by('-created_at')
        serializer = PlaylistSerializer(playlists, many=True, context={'request': request})
        return Response(serializer.data)

# Albums API
class AlbumsViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        albums = Albums.objects.all().order_by('-created_at')
        serializer = AlbumsSerializer(albums, many=True, context={'request': request})
        return Response(serializer.data)
