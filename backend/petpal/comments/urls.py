from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import ShelterCommentsView, ApplicationCommentsView

router = SimpleRouter()

router.register(r'shelters/(?P<shelter_id>\d+)', ShelterCommentsView, basename='shelter-comments')
router.register(r'application/(?P<application_id>\d+)', ApplicationCommentsView, basename='application-comments')

urlpatterns = [
    path('', include(router.urls)),
]
