
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserDetailSerializer, LoginSerializer, UserProfileSerializer
from knox.models import AuthToken
from django.http import Http404
from knox.auth import TokenAuthentication
import logging
logger = logging.getLogger('django')


class LoginView(APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(
            data=self.request.data,
            context={'request': self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        # return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response({
            "token": AuthToken.objects.create(user)[1]
        }, status=status.HTTP_202_ACCEPTED)


class UserCreate(APIView):
    """
    Creates the user.
    """
    permission_classes = (AllowAny,)
    # queryset = User.objects.all()
    # def get(self, request, format='json'):

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response({
                    "user": serializer.data,
                    "token": AuthToken.objects.create(user)[1]
                }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class LogoutView(views.APIView):

#     permission_classes = (permissions.)


class UserDetail(APIView):
    """User Profile View"""
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class UserProfile(APIView):
    """User Profile View"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = UserProfileSerializer

    def get_object(self, user_id):
        try:
            if user_id == 'current':
                logger.debug("Current User:")
                return self.request.user
            else:
                return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, user_id, format='json'):
        # print("UserID:", user_id)
        user = self.get_object(user_id)
        logger.debug("hello view")
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
