# Generated by Django 3.0.8 on 2021-05-20 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plugin', '0004_reward'),
    ]

    operations = [
        migrations.AddField(
            model_name='reward',
            name='count',
            field=models.IntegerField(default=0),
        ),
    ]