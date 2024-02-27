from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from uuid import uuid4
from .serializers import UrlModelSerializer
from .models import UrlModel
from rest_framework import status
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

class UrlViewSet(viewsets.ModelViewSet):
    queryset = UrlModel.objects.all()
    serializer_class = UrlModelSerializer

class GoToUrlView(APIView):
    def get(self, request, pk):

        urlData = get_object_or_404(UrlModel, uuid=pk)

        url = urlData.url

        if url == None:
            return Response({'message': 'URL Not Found'}, status=status.HTTP_404_NOT_FOUND)

        if "https" in url:
            return redirect(url)
        else:
            return redirect('https://' + url)

class UrlShortnerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        urlData = UrlModel.objects.filter(users=user)
        urlSerializer = UrlModelSerializer(urlData, many=True)
        return Response({'message': 'URL fetched successfully', 'data': urlSerializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        
        user = request.user
        userData = request.data

        url = userData.get('url')
        genUuid = str(uuid4())[:5]

        data = {
            'url': url,
            'uuid': genUuid,
            'users': user.id,
        }

        urlModelSerializer = UrlModelSerializer(data=data)

        if urlModelSerializer.is_valid(raise_exception=True):
            urlModelSerializer.save()
            newUrl = 'http://localhost:8000/api/v1/urls/' + genUuid
            return Response({'message': 'URL Shortened Successfully', 'url': newUrl}, status=status.HTTP_201_CREATED)
        
        return Response({'message': urlModelSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)
