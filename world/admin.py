from django.contrib.gis import admin

from .models.Huc12 import Huc12
from .models import WorldBorder

admin.site.register(WorldBorder, admin.GeoModelAdmin)
admin.site.register(Huc12, admin.GeoModelAdmin)
