from rest_framework import routers
from core.usercheckbytitle.viewsets import UserCheckViewSet
from core.livenews.viewsets import LiveNewsPrediction, LiveNewsByCategory
from core.newsquiz.viewsets import NewsQuizViewSet

router = routers.SimpleRouter()

router.register(r'usercheck/title', UserCheckViewSet, basename='game')
router.register(r'live', LiveNewsPrediction, basename='live')
router.register(r'quiz', NewsQuizViewSet, basename='quiz')
router.register(r'category/(?P<category>[^/.]+)', LiveNewsByCategory, basename='livenews-by-category')

urlpatterns = [
    *router.urls,
]