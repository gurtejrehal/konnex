from django.shortcuts import HttpResponse, render
from .models import Feedback, BugReporting, Announcement, Search, Reward
from .forms import FeedbackForm
from django.views.decorators.csrf import csrf_exempt
import base64, secrets, io
from PIL import Image
from django.core.files.base import ContentFile
from django.db.models import Count
from django.db.models.functions import ExtractWeekDay
from django.http import JsonResponse
from datetime import datetime
import requests
from bs4 import BeautifulSoup


def calculate_count():
    feed_count = Feedback.objects.annotate(weekday=ExtractWeekDay('created')) \
        .values('weekday') \
        .annotate(count=Count('id')) \
        .values('weekday', 'count')

    bug_count = BugReporting.objects.annotate(weekday=ExtractWeekDay('created')) \
        .values('weekday') \
        .annotate(count=Count('id')) \
        .values('weekday', 'count')

    noti_count = Announcement.objects.annotate(weekday=ExtractWeekDay('pub_date')) \
        .values('weekday') \
        .annotate(count=Count('id')) \
        .values('weekday', 'count')

    search_count = Search.objects.annotate(weekday=ExtractWeekDay('pub_date')) \
        .values('weekday') \
        .annotate(count=Count('id')) \
        .values('weekday', 'count')

    return feed_count, bug_count, noti_count, search_count


def actual_count(data):
    res = 0
    for obj in data:
        res += obj['count']
    return res


def get_image_from_data_url(data_url):
    _format, _dataurl = data_url.split(';base64,')
    _filename, _extension = secrets.token_hex(20), _format.split('/')[-1]

    file = ContentFile(base64.b64decode(_dataurl), name=f"{_filename}.{_extension}")

    return file, (_filename, _extension)


def count_dataset(counts):
    data = [0]*7

    for obj in counts:
        data[obj['weekday']] = obj['count']

    return data


@csrf_exempt
def search(request):
    if request.method == 'POST':
        keyword = request.POST.get('keyword')

        search = Search(keyword=keyword)
        search.save()

        search_count = actual_count(calculate_count()[3])
        r_list = Reward.objects.filter(plugin__name='Search').filter(count__lte=search_count)

        for obj in r_list:
            obj.completed = True
            obj.finish_time = datetime.now()
            obj.save()

        return HttpResponse('success')


@csrf_exempt
def description(request):
    if request.method == 'POST':
        result = "Could'nt generate a description, try using Support Chatbot maybe!"
        url = request.POST.get('url')

        # external_sites_html = urllib.request.urlopen(url)
        # soup = BeautifulSoup(external_sites_html)

        external_sites_html = requests.get(url)
        soup = BeautifulSoup(external_sites_html.text)

        description = soup.find('meta', attrs={'name': 'og:description'}) or soup.find('meta', attrs={
            'property': 'description'}) or soup.find('meta', attrs={'name': 'description'}) or\
                      soup.find('meta', attrs={'name': 'twitter:description'})

        if description:
            result = description.get('content')

        return HttpResponse(result)


@csrf_exempt
def feedback(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        comment = request.POST.get('comment')

        feedback = Feedback(name=name, email=email, subject=subject, comment=comment)
        feedback.save()

        feed_count = actual_count(calculate_count()[0])
        r_list = Reward.objects.filter(plugin__name='Feedback').filter(count__lte=feed_count)

        for obj in r_list:
            obj.completed = True
            obj.finish_time = datetime.now()
            obj.save()

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

        bug_count = actual_count(calculate_count()[1])
        r_list = Reward.objects.filter(plugin__name='Bugs').filter(count__lte=bug_count)

        for obj in r_list:
            obj.completed = True
            obj.finish_time = datetime.now()
            obj.save()

        return HttpResponse("success")


@csrf_exempt
def notifications(request):
    if request.method == 'GET':
        notifications = Announcement.objects.order_by("-pub_date")
        context = {
            'notifications': notifications
        }

        noti_count = actual_count(calculate_count()[2])
        r_list = Reward.objects.filter(plugin__name='Announcement').filter(count__lte=noti_count)

        for obj in r_list:
            obj.completed = True
            obj.finish_time = datetime.now()
            obj.save()

        return render(request, 'plugins/notifications.html', context=context)


@csrf_exempt
def usage(request):
    if request.method == 'GET':
        feed_count, bug_count, noti_count, search_count = calculate_count()
        res = {
            'search_count': count_dataset(search_count),
            'feed_count': count_dataset(feed_count),
            'bug_count': count_dataset(bug_count),
            'noti_count': count_dataset(noti_count)
        }

        return JsonResponse(res)


@csrf_exempt
def rewards_api(request):
    if request.method == 'GET':
        rewards_finish = Reward.objects.filter(completed=True).order_by('-finish_time')
        rewards_remaining = Reward.objects.filter(completed=False)
        points = sum([obj.points for obj in rewards_finish])
        context = {
            'rewards_finish': rewards_finish,
            'rewards_remaining': rewards_remaining,
            'points': points
        }

        return render(request, 'plugins/rewards.html', context=context)



