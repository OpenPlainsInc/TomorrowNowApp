from django.urls import path, include
from rest_framework import routers  
from django.views.decorators.cache import cache_page


from . import views

app_name = 'world'

urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.CountryListView.as_view()),
    path('map', views.mapview, name="Map"),
    path('countries/', cache_page(60 * 15)(views.WorldAPIView.as_view()), name='countires'),
    path('population/', cache_page(60 * 15)(views.WorldAPIViewCustom.as_view()), name='population'),
    path('counties/', cache_page(60 * 15)(views.WorldAPIViewCustom.as_view()), name='counties'),
    path('room/<str:room_name>/', views.room, name='room'),
]
