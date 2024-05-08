from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from rest_framework import status


class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        details = [
            {"id": detail.id, "name": detail.name, "detail": detail.detail}
            for detail in React.objects.all()
        ]
        return Response(details)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, pk):  # 'pk' = primary key or Id for deletion
        try:
            detail = React.objects.get(pk=pk)
            detail.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except React.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
