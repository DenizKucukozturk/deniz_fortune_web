from rest_framework import serializers
from rest_framework.fields import CharField

from ..models import Fortune


class FortuneSerializer(serializers.ModelSerializer):
    text = CharField(required=True)

    class Meta:
        model = Fortune
        fields = '__all__'
