from rest_framework import serializers
from .models import NewsQuizData


class NewsQuizSerializer(serializers.ModelSerializer):
    """Serializer for news quiz."""
    class Meta:
        model = NewsQuizData
        fields = ('id', 'news_title', 'news_description', 'label')


class NewsQuizAnsweredSerializer(serializers.Serializer):
    """Serializer for user's answer for quiz."""
    id = serializers.IntegerField()
    answer = serializers.BooleanField()

    class Meta:
        fields = ['id', 'answer']