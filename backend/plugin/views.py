from django.shortcuts import HttpResponse, render
from .models import Feedback, BugReporting, Announcement
from .forms import FeedbackForm
from django.views.decorators.csrf import csrf_exempt
import base64, secrets, io
from PIL import Image
from django.core.files.base import ContentFile


def get_image_from_data_url(data_url):
    _format, _dataurl = data_url.split(';base64,')
    _filename, _extension = secrets.token_hex(20), _format.split('/')[-1]

    file = ContentFile(base64.b64decode(_dataurl), name=f"{_filename}.{_extension}")

    return file, (_filename, _extension)


@csrf_exempt
def feedback(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        comment = request.POST.get('comment')

        feedback = Feedback(name=name, email=email, subject=subject, comment=comment)
        feedback.save()

        return HttpResponse('success')


@csrf_exempt
def bug(request):
    if request.method == 'POST':
        data_uri = request.POST.get('image')
        email = request.POST.get('email')
        comment = request.POST.get('comment')

        img = get_image_from_data_url(data_url=data_uri)[0]

        bug = BugReporting(image=img, email=email, comment=comment)
        bug.save()

        return HttpResponse("success")

@csrf_exempt
def notifications(request):
    if request.method == 'GET':
        print("here")

        c = request.GET.get('status')
        print(c)
        notifications = Announcement.objects.order_by("-pub_date")
        context = {
            'notifications': notifications
        }
        return render(request, 'plugins/notifications.html', context=context)



