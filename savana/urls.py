from django.urls import path, include
from rest_framework import routers  
from django.views.decorators.cache import cache_page


from . import views

app_name = 'savana'

urlpatterns = [
#    path('', views.CountryListView.as_view()),
   path('csrf/', views.csrf),
   path('ping/', views.ping),
   path('g/list/', cache_page(60 * 15)(views.gList), name="List"),
   path('r/info/<str:raster_name>/<str:mapset_name>', cache_page(60 * 15)(views.rInfo), name="rInfo"),
   path('r/renderpng/<str:raster_name>/<str:mapset_name>', cache_page(60 * 15)(views.rRenderImage), name="rRenderPNG"),
   path('r/geotiff/<str:raster_name>/<str:mapset_name>', views.rGeoTiff, name="rGeoTiff")

#    path('r', views.WorldAPIView.as_view(), name='countires'),
#    path('r3', views.WorldAPIView.as_view(), name='countires'),
#    path('v', views.WorldAPIViewCustom.as_view(), name='population'),
#    path('i', views.AcpInfo, name='info')
]