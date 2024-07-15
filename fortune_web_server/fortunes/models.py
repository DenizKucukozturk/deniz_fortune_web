from django.db import models

from fortunes.managers import FortuneManager


class Fortune(models.Model):
    text = models.TextField(blank=False, null=False)

    objects = FortuneManager()
