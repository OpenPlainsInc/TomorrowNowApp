from django.urls import path, include
from rest_framework import routers  


from . import views

app_name = 'world'
# urlpatterns = [
#     # ex: /polls/
#     path('', views.index, name='index'),
#     # ex: /polls/5/
#     path('<int:question_id>/', views.detail, name='detail'),
#     # ex: /polls/5/results/
#     path('<int:question_id>/results/', views.results, name='results'),
#     # ex: /polls/5/vote/
#     path('<int:question_id>/vote/', views.vote, name='vote'),
# ]   

# router = routers.DefaultRouter()                   
# router.register(r'countries', views.WorldAPIView, 'worldboarders')  

urlpatterns = [
#    path('', views.index, name='index'),
   path('', views.CountryListView.as_view()),
#    path('', include(router.urls)),
   path('map', views.mapview, name="Map"),
   path('countries/', views.WorldAPIView.as_view(), name='countires'),
   path('population/', views.WorldAPIViewCustom.as_view(), name='population'),
   path('info/', views.AcpInfo, name='info')
]