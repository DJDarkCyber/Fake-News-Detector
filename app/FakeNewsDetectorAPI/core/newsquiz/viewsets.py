from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

from .models import NewsQuizData
from .serializers import NewsQuizSerializer, NewsQuizAnsweredSerializer


class NewsQuizViewSet(viewsets.ViewSet):
    """A viewset to handle quiz."""
    http_method_names = ('get', 'post', )
    serializer_class = NewsQuizAnsweredSerializer

    def list(self, request):
        """Get's and returns random news from model."""
        news_for_quiz = NewsQuizData.objects.get_random_news()

        serializer = NewsQuizSerializer(news_for_quiz)

        if news_for_quiz:
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def create(self, request):
        """Get's answer from user and checkes whether the answer is correct or wrong."""
        serializer = NewsQuizAnsweredSerializer(data=request.data)

        if serializer.is_valid():
            news_id = serializer.validated_data['id']
            user_answer = serializer.validated_data['answer']
            real_answer = NewsQuizData.objects.get_label_of_news(news_id)
            real_answer = real_answer.label

            if real_answer == 1:
                real_answer = True
            elif real_answer == 0:
                real_answer = False

            if real_answer == user_answer:
                return Response({'result': True}, status=status.HTTP_200_OK)
            else:
                return Response({'result': False}, status=status.HTTP_200_OK)