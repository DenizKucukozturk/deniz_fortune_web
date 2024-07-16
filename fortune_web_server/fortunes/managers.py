from random import choice

from django.db import models


class FortuneManager(models.Manager):
    def random(self):
        from .models import Fortune

        ids = Fortune.objects.values_list('id', flat=True)
        random_id = choice(ids)
        random_obj = Fortune.objects.get(id=random_id)
        return random_obj
