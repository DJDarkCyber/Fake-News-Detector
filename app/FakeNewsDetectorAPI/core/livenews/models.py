from django.db import models


class LiveNews(models.Model):
    """Creates model to store news get from an API
    and predicts in real life."""
    title = models.CharField(max_length=2000)
    publication_date = models.DateTimeField()
    news_category = models.CharField(max_length=200)
    prediction = models.BooleanField(default=True)
    section_id = models.CharField(max_length=200)
    section_name = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    web_url = models.CharField(max_length=600)
    img_url = models.CharField(max_length=600)

    def __str__(self):
        return self.title
