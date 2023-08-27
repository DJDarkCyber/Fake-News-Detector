from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

import requests

from .models import LiveNews
from .serializers import LiveNewsSerializer, LiveNewsDetailedSerializer
from core.model import load_models


def get_new_news_from_api():
    """Gets news from the guardian news using it's API"""
    news_data = requests.get("https://content.guardianapis.com/search?api-key=e705adff-ca49-414e-89e2-7edede919e2e")
    news_data = news_data.json()

    news_titles = [article["webTitle"] for article in news_data["response"]["results"]]
    news_publication_dates = [article["webPublicationDate"] for article in news_data["response"]["results"]]
    news_categories = [article["pillarName"] for article in news_data["response"]["results"]]
    section_id = [article["sectionId"] for article in news_data["response"]["results"]]
    section_name = [article["sectionName"] for article in news_data["response"]["results"]]
    type = [article["type"] for article in news_data["response"]["results"]]
    web_url = [article["webUrl"] for article in news_data["response"]["results"]]

    return {'title': news_titles, 'publication_date': news_publication_dates, 'category': news_categories,
            'section_id': section_id, 'section_name': section_name, 'type': type, 'web_url': web_url}


class LiveNewsPrediction(viewsets.ViewSet):
    http_method_names = ('get', 'post', )

    def list(self, request):
        """Handles GET request by displaying all newly retrieved in database."""
        all_live_news = LiveNews.objects.all()

        serializer = LiveNewsSerializer(all_live_news, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        """Get's all data from a specific id in database."""
        try:
            news_prediction = LiveNews.objects.get(pk=pk)
        except LiveNews.DoesNotExist:
            return Response({"error": "News not found"}, status=404)
        
        serializer = LiveNewsDetailedSerializer(news_prediction)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """When a post request is sent, the news will get updated."""
        nb_model, vect_model = load_models()

        LiveNews.objects.all().delete()

        new_news = get_new_news_from_api()

        for i in range(len(new_news['title'])):
            title = new_news['title'][i]
            publication_date = new_news['publication_date'][i]
            category = new_news['category'][i]
            section_id = new_news['section_id'][i]
            section_name = new_news['section_name'][i]
            type = new_news['type'][i]
            web_url = new_news['web_url'][i]


            vectorized_text = vect_model.transform([title])
            prediction = nb_model.predict(vectorized_text)
            prediction_bool = True if prediction[0] == 1 else False

            news_article = LiveNews(
                title=title,
                publication_date=publication_date,
                news_category=category,
                prediction=prediction_bool,
                section_id=section_id,
                section_name=section_name,
                type=type,
                web_url=web_url

            )

            news_article.save()

        return Response("News Refreshed", status.HTTP_201_CREATED)
