from django.urls import path, include
from rest_framework import routers  
from django.views.decorators.cache import cache_page


from . import views

app_name = 'savana'

urlpatterns = [
    path('csrf/', views.csrf),
    path('ping/', views.ping),
    path('g/locations/', cache_page(60 * 15)(views.gLocations), name="ListLocations"),
    path('g/locations/<str:location_name>', cache_page(60 * 15)(views.gLocation), name="Location"),
    path('g/locations/<str:location_name>/info', cache_page(60 * 15)(views.gLocationInfo), name="LocationInfo"),
    path('g/locations/<str:location_name>/mapsets', cache_page(60 * 15)(views.gMapsets), name="Mapsets"),
    path('g/locations/<str:location_name>/mapsets/<str:mapset_name>', cache_page(60 * 15)(views.gMapset), name="Mapset"),
    path('g/locations/<str:location_name>/mapsets/<str:mapset_name>/info', cache_page(60 * 15)(views.gMapsetInfo), name="MapsetInfo"),
    path('g/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers', cache_page(60 * 15)(views.gListRasters), name="ListRaster"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>', cache_page(60 * 15)(views.rInfo), name="rInfo"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/render', cache_page(60 * 15)(views.rRenderImage), name="renderRaster"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/colors', cache_page(60 * 15)(views.rColors), name="rColors"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/geotiff_async_orig', cache_page(60 * 15)(views.rGeoTiff), name="rGeoTiff"),

   
    # path('r/geotiff/<str:raster_name>/<str:mapset_name>', views.rGeoTiff, name="rGeoTiff"),
    path('r/resource/<str:raster_name>/stream/<str:resource_id>', views.streamCOG, name="rStreamOCG"),
    path('r/drain/', views.rDrain, name="rDrain"),
    path('r', views.ping, name='r'),
    path('r3', views.ping, name='r3'),
    path('v', views.ping, name='v'),
    path('i', views.ping, name='i')
]
