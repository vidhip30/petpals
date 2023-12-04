"""
URL configuration for petpal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from accounts.views import PetSeekerViewSet, ShelterViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from notifications.views import NotificationViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter

# Source: https://github.com/alanjds/drf-nested-routers#quickstart

router = DefaultRouter()
router.register(r'accounts/seeker', PetSeekerViewSet)
router.register(r'accounts/shelter', ShelterViewSet)

seeker_router = NestedSimpleRouter(
    router, r'accounts/seeker', lookup='account')
seeker_router.register(
    r'notifications', NotificationViewSet, basename='notifications_seeker')

shelter_router = NestedSimpleRouter(
    router, r'accounts/shelter', lookup='account')
shelter_router.register(
    r'notifications', NotificationViewSet, basename='notifications_shelter')


schema_view = get_schema_view(
    openapi.Info(
        title="PetPal",
        default_version='v1',
        description="REST API"
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('comments/', include('comments.urls')),
    path('', include(router.urls)),
    path('', include(seeker_router.urls)),
    path('', include(shelter_router.urls)),
    path('', include('petListings.urls')),
    path('', include('applications.urls')),

    # Source: https://www.django-rest-framework.org/topics/documenting-your-api/#a-minimal-example-with-swagger-ui
    path('swagger-ui/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
