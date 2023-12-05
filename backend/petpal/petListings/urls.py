from django.urls import path
from . import views

urlpatterns = [ 
    path('shelters/petlistings/', views.PetListingsCreate.as_view()),
    path('petlistings/', views.PetListingsList.as_view()),
    path('shelters/petlistings/<int:pk>/', views.ListingsRetrieveUpdateDestroy.as_view()),
]
