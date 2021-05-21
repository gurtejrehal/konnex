from django.contrib import admin
from .models import PluginName, Feedback, BugReporting, Announcement, Search, Reward


admin.site.site_header = 'Konnex administration'


class AnnouncementAdmin(admin.ModelAdmin):
    readonly_fields = ('created_by',)
    list_filter = ['created_by']

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        obj.save()


class RewardAdmin(admin.ModelAdmin):
    list_display = ('title', 'plugin',)
    list_filter = ['plugin__name']


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'rating',)
    list_filter = ['rating']


admin.site.register(PluginName)
admin.site.register(Search)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(BugReporting)
admin.site.register(Reward, RewardAdmin)
admin.site.register(Announcement, AnnouncementAdmin)
