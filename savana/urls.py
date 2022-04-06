from django.urls import path, include
from rest_framework import routers  
from django.views.decorators.cache import cache_page


from . import views

app_name = 'savana'

urlpatterns = [
    path('csrf/', views.csrf),
    path('ping/', views.ping),

    path('g/list/', cache_page(60 * 15)(views.gList), name="List"),
    path('r/info/<str:raster_name>/<str:mapset_name>', cache_page(60 * 15)(views.rInfo), name="rInfo"),
    path('r/renderpng/<str:raster_name>/<str:mapset_name>', cache_page(60 * 15)(views.rRenderImage), name="rRenderPNG"),
    path('r/geotiff/<str:raster_name>/<str:mapset_name>', views.rGeoTiff, name="rGeoTiff"),
    path('r/resource/<str:raster_name>/stream/<str:resource_id>', views.streamCOG, name="rStreamOCG"),
    path('r', views.ping, name='r'),
    path('r3', views.ping, name='r3'),
    path('v', views.ping, name='v'),
    path('i', views.ping, name='i')
]
