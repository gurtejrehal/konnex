from . import views
from django.urls import path

app_name = 'plugin'

urlpatterns = [
    path('search/', views.search, name="search"),
    path('get-description/', views.description, name="description"),
    path('feedback/', views.feedback, name="feedback"),
    path('bug/', views.bug, name="bug"),
    path('notifications/', views.notifications, name="notifications"),
    path('usage/', views.usage, name="usage"),
    path('rewards/', views.rewards_api, name="rewards"),
    path('support/', views.support, name="support")
]
