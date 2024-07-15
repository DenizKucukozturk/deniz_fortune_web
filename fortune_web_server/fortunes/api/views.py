from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from fortunes.models import Fortune
from .serializers import FortuneSerializer


@api_view(['GET'])
def get_fortune(request):
    fortune = Fortune.objects.random()
    serializer = FortuneSerializer(fortune, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def add_fortune(request):
    serializer = FortuneSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)