from django.db import models

from .managers import FortuneManager


class Fortune(models.Model):
    text = models.TextField(blank=False, null=False)

    objects = FortuneManager()
