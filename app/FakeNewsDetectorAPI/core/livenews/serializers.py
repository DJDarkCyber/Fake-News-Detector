from rest_framework import serializers
from .models import LiveNews


class LiveNewsSerializer(serializers.ModelSerializer):
    """Serializes the required fields from the `LiveNews` model"""
    class Meta:
        model = LiveNews
        fields = (
                    'id', 'title', 'publication_date',
                    'news_category', 'prediction', 'img_url',
                 )


class LiveNewsDetailedSerializer(serializers.ModelSerializer):
    """Serialized all fields from the `LiveNews` model"""
    class Meta:
        model = LiveNews
        fields = (
                    'id', 'title', 'publication_date',
                    'news_category', 'prediction', 'section_id',
                    'section_name', 'type', 'web_url', 'img_url'
                 )
