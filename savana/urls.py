from django.urls import path, include
from rest_framework import routers  


from . import views

app_name = 'savana'

urlpatterns = [
#    path('', views.CountryListView.as_view()),
   path('g/list/', views.gList, name="List"),
   path('r/renderpng/<str:raster_name>/<str:mapset_name>', views.rRenderImage, name="rRenderPNG")
#    path('r', views.WorldAPIView.as_view(), name='countires'),
#    path('r3', views.WorldAPIView.as_view(), name='countires'),
#    path('v', views.WorldAPIViewCustom.as_view(), name='population'),
#    path('i', views.AcpInfo, name='info')
]