from . import views
from django.urls import path

app_name = 'plugin'

urlpatterns = [
    path('feedback/', views.feedback, name="feedback"),
    path('bug/', views.bug, name="bug")
]
