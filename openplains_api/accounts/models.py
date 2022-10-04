# from django.contrib.auth.models import AbstractUser
# from django.db import models


# # NOTES
# # https://docs.djangoproject.com/en/4.0/topics/auth/customizing/#substituting-a-custom-user-model
# # https://learndjango.com/tutorials/django-custom-user-model
# # https://django-guardian.readthedocs.io/en/stable/userguide/custom-user-model.html
# #
# # django-guardian relies heavily on the auth.User model.
# # Specifically it was build from the ground-up with relation
# # between auth.User and auth.Group models. Retaining this
# # relation is crucial for guardian - without many to many
# # User (custom or default) and auth.Group relation django-
# # guardian will BREAK


# class CustomUser(AbstractUser):
#     pass
#     # add additional fields in here

#     def __str__(self):
#         return self.username
