from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import WorldBorder

world_mapping = {
    'fips' : 'FIPS',
    'iso2' : 'ISO2',
    'iso3' : 'ISO3',
    'un' : 'UN',
    'name' : 'NAME',
    'area' : 'AREA',
    'pop2005' : 'POP2005',
    'region' : 'REGION',
    'subregion' : 'SUBREGION',
    'lon' : 'LON',
    'lat' : 'LAT',
    'mpoly' : 'MULTIPOLYGON',
}

world_shp = Path(__file__).resolve().parent / 'data/world/' / 'TM_WORLD_BORDERS-0.3.shp'


def run(verbose=True):
    lm = LayerMapping(WorldBorder, world_shp, world_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)


def importFeatureSericeToModel():
    import requests
    url = "https://hydrowfs.nationalmap.gov/arcgis/rest/services/wbd/MapServer/6/" \
        "query?limit=1&where=OBJECTID%3DOBJECTID&objectIds=&returnGeometry=true&outFields=*&f=geojson"

    r = requests.get(url)
    jsonResponse = r.json()
    print(jsonResponse)
