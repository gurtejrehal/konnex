from django import forms
from .models import Feedback

class FeedbackForm(forms.ModelForm):
    """
    feedback form template
    """

    name = forms.CharField(help_text="Enter your name", max_length=25, required=True)
    email = forms.EmailField(help_text="enter your mail", max_length=30, required=True)
    subject = forms.CharField(help_text="Enter Subject", max_length=50, required=True)
    comment = forms.CharField(required=True, max_length=1000)

    class Meta:
        model = Feedback
        exclude = ('created', )