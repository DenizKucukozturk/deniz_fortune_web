from random import randint

from django.db import models


class FortuneManager(models.Manager):
    def random(self):
        from .models import Fortune

        count = Fortune.objects.count()
        random_index = randint(0, count - 1)
        return self.all()[random_index]