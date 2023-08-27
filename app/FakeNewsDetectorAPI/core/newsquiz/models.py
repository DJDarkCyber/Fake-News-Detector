from django.db import models
import random


class NewsQuizDataManager(models.Manager):
    """A model manager to retrieve data from model."""
    def get_random_news(self):
        """Gets random news."""
        count = self.all().count()
        if count == 0:
            return None
        random_index = random.randint(0, count-1)
        return self.all()[random_index]

    def get_label_of_news(self, news_id):
        """Get the label of news by it's id."""
        try:
            news_item = self.get(id=news_id)
            return news_item
        except NewsQuizData.DoesNotExist:
            return None
        

class NewsQuizData(models.Model):
    """A model to store news to generate quiz."""
    news_title = models.TextField()
    news_description = models.TextField()
    label = models.BooleanField()

    objects = NewsQuizDataManager()

    def __str__(self):
        return {self.news_title}
    
