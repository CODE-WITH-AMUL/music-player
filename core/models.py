from django.db import models
from django.utils import timezone

class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ['-created_at']



class Song(TimeStampModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    artist = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='database/song_cover_image/')
    audio_file = models.FileField(upload_to='database/song_audio/')
    duration = models.FloatField(blank=True, null=True)
    genre = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.title} - {self.artist}"


class Albums(TimeStampModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    songs = models.ManyToManyField(Song, related_name='albums')
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='database/album_cover_image/')

    def __str__(self):
        return self.title


class Playlist(TimeStampModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='database/playlist_cover_image/', blank=True, null=True)
    songs = models.ManyToManyField(Song, related_name='playlists')

    def __str__(self):
        return self.title
