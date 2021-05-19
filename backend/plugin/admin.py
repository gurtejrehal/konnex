from django.contrib import admin
from .models import PluginName


admin.site.site_header = 'Konnex administration'


admin.site.register(PluginName)