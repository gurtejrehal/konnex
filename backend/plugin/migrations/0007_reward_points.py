# Generated by Django 3.0.8 on 2021-05-20 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plugin', '0006_reward_finish_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='reward',
            name='points',
            field=models.IntegerField(default=10),
        ),
    ]
