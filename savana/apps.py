from django.apps import AppConfig


class SavanaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'savana'

    def ready(self):
        # Import celery app now that Django is mostly ready.
        # This initializes Celery and autodiscovers tasks
        import api.celery
