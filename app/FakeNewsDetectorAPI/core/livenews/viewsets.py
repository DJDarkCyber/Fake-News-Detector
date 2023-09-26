from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

import requests

from .models import LiveNews
from .serializers import LiveNewsSerializer, LiveNewsDetailedSerializer
from core.model import load_models

import threading
import time


def get_new_news_from_api_and_update():
    """Gets news from the guardian news using it's API"""
    news_data = requests.get("https://content.guardianapis.com/search?api-key=e705adff-ca49-414e-89e2-7edede919e2e")
    news_data = news_data.json()

    news_titles = [article["webTitle"] for article in news_data["response"]["results"]]
    news_publication_dates = [article["webPublicationDate"] for article in news_data["response"]["results"]]
    news_categories = []

    for article in news_data["response"]["results"]:
        try:
            news_categories.append(article["pillarName"])
        except KeyError:
            news_categories.append("Undefined")
    # news_categories = [article["pillarName"] for article in news_data["response"]["results"]]
    section_id = [article["sectionId"] for article in news_data["response"]["results"]]
    section_name = [article["sectionName"] for article in news_data["response"]["results"]]
    type = [article["type"] for article in news_data["response"]["results"]]
    web_url = [article["webUrl"] for article in news_data["response"]["results"]]

    nb_model, vect_model = load_models()

    for i in range(len(news_titles)):
            title_ = news_titles[i]
            publication_date_ = news_publication_dates[i]
            category_ = news_categories[i]
            section_id_ = section_id[i]
            section_name_ = section_name[i]
            type_ = type[i]
            web_url_ = web_url[i]

            if not LiveNews.objects.filter(web_url=web_url_).exists():

                vectorized_text = vect_model.transform([title_])
                prediction = nb_model.predict(vectorized_text)
                prediction_bool = True if prediction[0] == 1 else False

                news_article = LiveNews(
                    title=title_,
                    publication_date=publication_date_,
                    news_category=category_,
                    prediction=prediction_bool,
                    section_id=section_id_,
                    section_name=section_name_,
                    type=type_,
                    web_url=web_url_

                )

                news_article.save()


def auto_refresh_news():
    get_new_news_from_api_and_update()
    

    interval = 10
    while True:
        print("Thread running!")
        get_new_news_from_api_and_update()
        time.sleep(interval)


auto_refresh_thread = threading.Thread(target=auto_refresh_news)
auto_refresh_thread.daemon = True
auto_refresh_thread.start()


class LiveNewsPrediction(viewsets.ViewSet):
    http_method_names = ('get', 'post', )

    def list(self, request):
        """Handles GET request by displaying all newly retrieved in database."""
        all_live_news = LiveNews.objects.all().order_by('-id')[:10]

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
