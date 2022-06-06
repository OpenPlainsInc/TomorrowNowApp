
from rest_framework import permissions
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login

from . import serializers


class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(
            data=self.request.data,
            context={'request': self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)


# class LogoutView(views.APIView):
    
#     permission_classes = (permissions.)
