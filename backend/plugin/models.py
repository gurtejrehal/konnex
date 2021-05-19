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


class Feedback(models.Model):
    """
    Feedback
    """

    name = models.CharField(max_length=25)
    email = models.EmailField()
    subject = models.CharField(max_length=50)
    comment = models.TextField(max_length=1000)

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

        if diff.days == 0 and diff.seconds >= 0 and diff.seconds < 60:
            seconds = diff.seconds

            if seconds == 1:
                return str(seconds) + "second ago"

            else:
                return str(seconds) + " seconds ago"

        if diff.days == 0 and diff.seconds >= 60 and diff.seconds < 3600:
            minutes = math.floor(diff.seconds / 60)

            if minutes == 1:
                return str(minutes) + " minute ago"

            else:
                return str(minutes) + " minutes ago"

        if diff.days == 0 and diff.seconds >= 3600 and diff.seconds < 86400:
            hours = math.floor(diff.seconds / 3600)

            if hours == 1:
                return str(hours) + " hour ago"

            else:
                return str(hours) + " hours ago"

        # 1 day to 30 days
        if diff.days >= 1 and diff.days < 30:
            days = diff.days

            if days == 1:
                return str(days) + " day ago"

            else:
                return str(days) + " days ago"

        if diff.days >= 30 and diff.days < 365:
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

