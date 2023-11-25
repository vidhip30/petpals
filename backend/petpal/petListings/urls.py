from django.urls import path
from . import views

urlpatterns = [ 
    path('shelters/<int:pk>/petlistings/', views.PetListingsCreate.as_view()),
    path('petlistings/', views.PetListingsList.as_view()),
    path('shelters/<int:shelter_pk>/petlistings/<int:pk>/', views.ListingsRetrieveUpdateDestroy.as_view()),
]
