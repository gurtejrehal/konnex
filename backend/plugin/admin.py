from django.contrib import admin
from .models import PluginName, Feedback, BugReporting, Announcement


admin.site.site_header = 'Konnex administration'


class AnnouncementAdmin(admin.ModelAdmin):
    readonly_fields = ('created_by',)
    list_filter = ['created_by']

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        obj.save()


admin.site.register(PluginName)
admin.site.register(Feedback)
admin.site.register(BugReporting)
admin.site.register(Announcement, AnnouncementAdmin)