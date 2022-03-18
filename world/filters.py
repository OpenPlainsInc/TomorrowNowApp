import django_filters
from .models import WorldBorder

class WorldPopulationFilter(django_filters.FilterSet):
    """
    Allows user to search by population and area
    """
    pop2005 = django_filters.RangeFilter()
    area = django_filters.RangeFilter()

    class Meta:
        model = WorldBorder
        ordering = ['name']
        fields = ['pop2005','area','name', 'region', 'subregion', 'un']