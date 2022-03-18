from django.contrib.gis.db import models
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)

class WorldBorder(models.Model):
    # Regular Django fields corresponding to the attributes in the
    # world borders shapefile.
    name = models.CharField(max_length=50)
    area = models.IntegerField()
    pop2005 = models.IntegerField('Population 2005')
    fips = models.CharField('FIPS Code', max_length=2, null=True)
    iso2 = models.CharField('2 Digit ISO', max_length=2)
    iso3 = models.CharField('3 Digit ISO', max_length=3)
    un = models.IntegerField('United Nations Code')
    region = models.IntegerField('Region Code')
    subregion = models.IntegerField('Sub-Region Code')
    lon = models.FloatField()
    lat = models.FloatField()

    # GeoDjango-specific: a geometry field (MultiPolygonField)
    mpoly = models.MultiPolygonField()

    # Returns the string representation of the model.
    def __str__(self):
        return self.name

    @property
    def population_density(self):
        """
        Population per km2
        """
        pop_density = None
        try:
           pop_density = float(self.pop2005 / float(self.area/ 1e6))
        except ZeroDivisionError:
            logger.warning(f"Zero Division Error: Country: {self.name}, Population: {self.pop2005}, Area: {self.area}")
        return pop_density

# class Elevation(models.Model):
#     name = models.CharField(max_length=100)
#     rast = models.RasterField()