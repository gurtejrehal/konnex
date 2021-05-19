from django.db import models


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
    comment = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    
