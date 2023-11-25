from django.urls import path
from . import views


urlpatterns = [ 
    path('pet_listings/<int:listing_id>/applications/', views.ApplicationsCreate.as_view()),
    path('applications/<int:pk>/', views.ApplicationsUpdate.as_view()),
    path('applications/', views.ApplicationsList.as_view()),
    path('pet_listings/applications/<int:pk>/', views.GetApplication.as_view()),
]