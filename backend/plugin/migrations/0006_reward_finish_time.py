# Generated by Django 3.0.8 on 2021-05-20 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plugin', '0005_reward_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='reward',
            name='finish_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
