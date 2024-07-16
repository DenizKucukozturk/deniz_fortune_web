from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import FortuneSerializer
from ..models import Fortune


def get_fortune(request):
    fortune = Fortune.objects.random()
    serializer = FortuneSerializer(fortune, many=False)

    return Response(serializer.data)


def add_fortune(request):
    serializer = FortuneSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def fortune_views(request):
    if request.method == 'GET':
        return get_fortune(request)
    elif request.method == 'POST':
        return add_fortune(request)
