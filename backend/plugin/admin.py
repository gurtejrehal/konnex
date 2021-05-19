from django.contrib import admin
from .models import PluginName, Feedback, BugReporting


admin.site.site_header = 'Konnex administration'


admin.site.register(PluginName)
admin.site.register(Feedback)
admin.site.register(BugReporting)