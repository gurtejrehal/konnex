# AEROTHON 2021

## Konnex - AI Assistant (A Browser Extension AI Powered App)

See installation [here](#how-to-install)

## What is this?
Konnex- AI Assistant is Web Browser(Chrome, Firefox, etc) base Extension is an overlay over all websites, which provides a visual environment for automating the workflow. It features multiple plugins which are fully customizeable and controlled by the admin. 
What more could we wish for, all the AI capabilities under the hood without any dependecies, just add it your browser extension.

### Front-end (Client)
Konnex provides the following features:
- Search - Find what you're looking for on the go!
- Summarize your page. (Have a quick small summary generated of your page!)
- Bug Reporting. (Get rewarded and help Konnex become better)
- Trends and Analytica
- Graphical Data
- 24/7 fully trained AI - Powered Chat Bot
- Announcements/Notifications on go!
- CSRF Protection
- Rewards for eveything you do, claim your points!
- Multilingual - now use Konnex in your regional language!
- Feedbacks
- Use on go!

 Konnex works seamlessly without any dependency, just add it your browser and you are good to go!

### Back-end (Administration)
Konnex  Administration has a strong control over the app. Following are the features Konnex Admin provides.
- Highly Customizable Plugins, Start/Stop whenever you like!
- Role based Admin hierarchy (Super Admin -> Admin -> Staff)
- Keep a record of all the activity on Konnex at your fingertip
- Have a track of all the users with high reward points.
- Push Announcements/Notifications enabled
- Check Bug Reportings and fix bugs earlier
- Add Reward task and points!
- Get an insight of feedbacks
- Super Admin keep tracks of all recent admin activities.
- Scalable


![collage (1)](https://user-images.githubusercontent.com/28597524/100134680-9392f100-2eae-11eb-9e32-071c90947766.jpg "FALCON")



### Efficient
Konnex v2 uses the celery worker feature to take up multiple tasks from the user and perform it in a queue.
We can have upto 10 celery workers at a time. This feature allows us to scale the application.


## How to Install
   
# Backend
- Create virtual environment, then activate it.
- Install all the requirements file, ``` pip install -r requirements.txt```
- For first time usage, ```python manage.py migrate``` and create admin ```python manage.py createsuperuser```
- Run KONNEX, ```python manage.py runserver```

### Optional Message Service
- Requires you to get your Twilio API key in backend/Konnex/settings.py
`ACCOUNT_SID=your_twilio_account_sid`
   `AUTH_TOKEN=your_twilio_auth_token`

# Frontend
- From Web browser Extension page add it from the frontend folder.
- Go to Chrome Extension Store, turn on Developer mode.
- Click on `Load Unpacked` and choose frontend folder!

Or wait till we add it to Web Browser(Chrome/Firefox/Opera/Edge) Extension Store soon!





