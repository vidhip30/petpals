# Generated by Django 4.2.7 on 2023-12-11 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_remove_comment_user_comment_petseeker'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='stars',
            field=models.IntegerField(blank=True, choices=[(1, '1 star'), (2, '2 stars'), (3, '3 stars'), (4, '4 stars'), (5, '5 stars')], null=True),
        ),
    ]
