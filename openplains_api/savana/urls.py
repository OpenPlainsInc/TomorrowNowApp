from django.urls import path, include
from rest_framework import routers  
from django.views.decorators.cache import cache_page


from . import views

app_name = 'savana'

urlpatterns = [
    # path('csrf/', views.csrf),
    path('ping/', views.ping),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('g/locations/', views.gLocations, name="ListLocations"),
    path('g/locations/<str:location_name>', views.gLocation, name="Location"),
    path('g/locations/<str:location_name>/info', cache_page(60 * 15)(views.gLocationInfo), name="LocationInfo"),
    path('g/locations/<str:location_name>/mapsets', views.gMapsets, name="Mapsets"),
    path('g/locations/<str:location_name>/mapsets/<str:mapset_name>', views.gMapset, name="Mapset"),
    path('g/locations/<str:location_name>/mapsets/<str:mapset_name>/info', cache_page(60 * 15)(views.gMapsetInfo), name="MapsetInfo"),
    path('g/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers', cache_page(60 * 15)(views.gListRasters), name="ListRaster"),
    path('g/locations/<str:location_name>/mapsets/<str:mapset_name>/vector_layers', cache_page(60 * 15)(views.gListVectors), name="ListVector"),

    path('g/modules', cache_page(60 * 15)(views.gModules), name="gModules"),
    path('g/modules/<str:grassmodule>', cache_page(60 * 15)(views.gModule), name="gModule"),


    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>', cache_page(60 * 15)(views.rInfo), name="rInfo"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/no_cache', views.rInfo, name="rInfo"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/render', cache_page(60 * 15)(views.rRenderImage), name="renderRaster"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/colors', cache_page(60 * 15)(views.rColors), name="rColors"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/geotiff_async_orig', views.rGeoTiff, name="rGeoTiff"),

    ## Raster Stats
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/area_stats_async', cache_page(60 * 15)(views.rRenderImage), name="area_stats_async"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/area_stats_sync', cache_page(60 * 15)(views.rRenderImage), name="area_stats_sync"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/area_stats_univar_async', cache_page(60 * 15)(views.rRenderImage), name="area_stats_univar_async"),
    path('r/locations/<str:location_name>/mapsets/<str:mapset_name>/raster_layers/<str:raster_name>/area_stats_univar_sync', cache_page(60 * 15)(views.rRenderImage), name="area_stats_univar_sync"),
    path('r/resource/<str:raster_name>/stream/<str:resource_id>', views.streamCOG, name="rStreamOCG"),
    path('r/drain/', views.rDrain, name="rDrain"),
    
    path('r', views.ping, name='r'),
    path('r3', views.ping, name='r3'),

    path('v', views.ping, name='v'),
    path('v/locations/<str:location_name>/mapsets/<str:mapset_name>/vector_layers/<str:vector_name>', cache_page(60 * 15)(views.vInfo), name="vInfo"),
    path('v/locations/<str:location_name>/mapsets/<str:mapset_name>/vector_layers/<str:vector_name>/render', cache_page(60 * 15)(views.vRenderImage), name="renderVector"),
    # path('v/locations/<str:location_name>/mapsets/<str:mapset_name>/vector_layers/<str:vector_name>/sampling_async', cache_page(60 * 15)(views.rColors), name="vSamplingAsync"),
    # path('v/locations/<str:location_name>/mapsets/<str:mapset_name>/vector_layers/<str:vector_name>/sampling_sync', views.rGeoTiff, name="vSamplingSync"),
    # path('model', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>/predictors', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>/pressure', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>/potential', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>/demand', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>/calibration', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>/scenario', views.rGeoTiff, name="vSamplingSync"),
    # path('model/<str:model_id>/futures/<str:futures_id>/scenario/<str:scenario_id>', views.rGeoTiff, name="vSamplingSync"),


    
    path('i', views.ping, name='i')
]
