from django.contrib.gis import admin

from .models.Huc12 import Huc12
from .models import WorldBorder, County


class CountyAdmin(admin.GISModelAdmin):
    list_display = ("id", "name", "statefp", "countyfp", "geoid")
    search_fields = ("statefp", "geoid", "countyfp", "name")
    list_filter = ('geoid',)


admin.site.register(WorldBorder, admin.GISModelAdmin)
admin.site.register(Huc12, admin.GISModelAdmin)
admin.site.register(County, CountyAdmin)
