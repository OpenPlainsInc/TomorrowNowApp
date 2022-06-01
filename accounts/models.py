from django.contrib.auth.models import AbstractUser
from django.db import models

# https://learndjango.com/tutorials/django-custom-user-model


class CustomUser(AbstractUser):
    pass
    # add additional fields in here

    def __str__(self):
        return self.username
