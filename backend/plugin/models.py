from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import math


class PluginName(models.Model):
    """
    Plugins Table
    """

    name = models.CharField(max_length=100, blank=False, null=False)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Search(models.Model):
    """
    Search
    """

    keyword = models.CharField(max_length=100, null=False)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.keyword


class Feedback(models.Model):
    """
    Feedback
    """

    name = models.CharField(max_length=25)
    email = models.EmailField()
    subject = models.CharField(max_length=50)
    comment = models.TextField(max_length=1000)
    rating = models.IntegerField(default=1)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + " ---- " + self.email


class BugReporting(models.Model):
    """
    Bug Reporting
    """

    image = models.ImageField(null=True, upload_to='bug_images')
    email = models.EmailField()
    comment = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)


class Reward(models.Model):
    """
    Rewards
    """
    plugin = models.ForeignKey(PluginName, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    count = models.IntegerField(default=0)
    points = models.IntegerField(default=10)
    completed = models.BooleanField(default=False)
    finish_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title

    def whenpublished(self):
        now = timezone.now()

        if self.finish_time is not None:
            diff = now - self.finish_time

            if diff.days == 0 and 0 <= diff.seconds < 60:
                seconds = diff.seconds

                if seconds == 1:
                    return str(seconds) + "second ago"

                else:
                    return str(seconds) + " seconds ago"

            if diff.days == 0 and 60 <= diff.seconds < 3600:
                minutes = math.floor(diff.seconds / 60)

                if minutes == 1:
                    return str(minutes) + " minute ago"

                else:
                    return str(minutes) + " minutes ago"

            if diff.days == 0 and 3600 <= diff.seconds < 86400:
                hours = math.floor(diff.seconds / 3600)

                if hours == 1:
                    return str(hours) + " hour ago"

                else:
                    return str(hours) + " hours ago"

            # 1 day to 30 days
            if 1 <= diff.days < 30:
                days = diff.days

                if days == 1:
                    return str(days) + " day ago"

                else:
                    return str(days) + " days ago"

            if 30 <= diff.days < 365:
                months = math.floor(diff.days / 30)

                if months == 1:
                    return str(months) + " month ago"

                else:
                    return str(months) + " months ago"

            if diff.days >= 365:
                years = math.floor(diff.days / 365)

                if years == 1:
                    return str(years) + " year ago"

                else:
                    return str(years) + " years ago"


class Announcement(models.Model):
    """
    Announcement
    """

    created_by = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'is_staff': True}, editable=False)
    title = models.CharField(max_length=50)
    message = models.TextField(max_length=200)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def whenpublished(self):
        now = timezone.now()

        diff = now - self.pub_date

        if diff.days == 0 and 0 <= diff.seconds < 60:
            seconds = diff.seconds

            if seconds == 1:
                return str(seconds) + "second ago"

            else:
                return str(seconds) + " seconds ago"

        if diff.days == 0 and 60 <= diff.seconds < 3600:
            minutes = math.floor(diff.seconds / 60)

            if minutes == 1:
                return str(minutes) + " minute ago"

            else:
                return str(minutes) + " minutes ago"

        if diff.days == 0 and 3600 <= diff.seconds < 86400:
            hours = math.floor(diff.seconds / 3600)

            if hours == 1:
                return str(hours) + " hour ago"

            else:
                return str(hours) + " hours ago"

        # 1 day to 30 days
        if 1 <= diff.days < 30:
            days = diff.days

            if days == 1:
                return str(days) + " day ago"

            else:
                return str(days) + " days ago"

        if 30 <= diff.days < 365:
            months = math.floor(diff.days / 30)

            if months == 1:
                return str(months) + " month ago"

            else:
                return str(months) + " months ago"

        if diff.days >= 365:
            years = math.floor(diff.days / 365)

            if years == 1:
                return str(years) + " year ago"

            else:
                return str(years) + " years ago"
