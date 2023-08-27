from rest_framework import serializers


class UserCheckSerializer(serializers.Serializer):
    """Serializes the data entered by an user."""
    user_news = serializers.CharField()
    
    class Meta:
        fields = ['user_news', ]