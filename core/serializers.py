from rest_framework import serializers
from .models import Albums, Playlist, Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

class AlbumsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Albums
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'
