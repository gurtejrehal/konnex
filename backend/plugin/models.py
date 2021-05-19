from django.db import models


class PluginName(models.Model):
    """
    Plugins Table
    """

    name = models.CharField(max_length=100, blank=False, null=False)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name