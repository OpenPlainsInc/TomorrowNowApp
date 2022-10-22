# Request to import and reproject county data
v.in.ogr input="PG:host=db port=5432 dbname=actinia user=actinia password=actinia" layer=cb_2018_us_county_500k where="geoid in ('48113','48397','48085','48439','48121')" output=counties location="cb_2018_us_county_500k"
v.proj in=counties location=cb_2018_us_county_500k mapset=PERMANENT

# Next Request
# Load NLCD data for each year
# Convert counties to raster TODO: Convert on geoid attribute (need to cast to Int)
g.region res=30 vector=counties
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif memory=10000 extent=region output=nlcd_2019_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2016_cog.tif memory=10000 extent=region output=nlcd_2016_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2013_cog.tif memory=10000 extent=region output=nlcd_2013_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2011_cog.tif memory=10000 extent=region output=nlcd_2011_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2008_cog.tif memory=10000 extent=region output=nlcd_2008_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2006_cog.tif memory=10000 extent=region output=nlcd_2006_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2004_cog.tif memory=10000 extent=region output=nlcd_2004_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2001_cog.tif memory=10000 extent=region output=nlcd_2001_cog resolution=region

g.region res=30 vector=counties align=nlcd_2019_cog
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/SpatialData/PADUS3_0_Raster_CONUS_cog.tif memory=10000 extent=region output=protected_areas resolution=region
r.null map='protected_areas' null=0
r.mapcalc expression="urban_2001 = if(nlcd_2001_cog >= 21 && nlcd_2001_cog <= 24, 1, if(nlcd_2001_cog == 11 || nlcd_2001_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2004 = if(nlcd_2004_cog >= 21 && nlcd_2004_cog <= 24, 1, if(nlcd_2004_cog == 11 || nlcd_2004_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2006 = if(nlcd_2006_cog >= 21 && nlcd_2006_cog <= 24, 1, if(nlcd_2006_cog == 11 || nlcd_2006_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2008 = if(nlcd_2008_cog >= 21 && nlcd_2008_cog <= 24, 1, if(nlcd_2008_cog == 11 || nlcd_2008_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2011 = if(nlcd_2011_cog >= 21 && nlcd_2011_cog <= 24, 1, if(nlcd_2011_cog == 11 || nlcd_2011_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2013 = if(nlcd_2013_cog >= 21 && nlcd_2013_cog <= 24, 1, if(nlcd_2013_cog == 11 || nlcd_2013_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2016 = if(nlcd_2016_cog >= 20 && nlcd_2016_cog <= 24, 1, if(nlcd_2016_cog == 11 || nlcd_2016_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2019 = if(nlcd_2019_cog >= 20 && nlcd_2019_cog <= 24, 1, if(nlcd_2019_cog == 11 || nlcd_2019_cog >= 90 || protected_areas, null(), 0))"

# Convert counties to rasters with geoid as value
v.db.addcolumn map=counties columns="geoid_value int"
v.db.update map=counties column="geoid_value" query_column="geoid"
v.to.rast input=counties layer=1 type=area use=attr attribute_column="geoid_value" memory=3000 output=counties

# Distance from protected areas
r.null map='protected_areas' setnull=0
r.grow.distance input='protected_areas' distance='dist_to_protected'

# Distance from lakes/rivers
r.mapcalc expression="water = if(nlcd_2019_cog == 11, 1, null())"
r.grow.distance input='water' distance='dist_to_water'

# Forests
r.mapcalc expression="forest = if(nlcd_2019_cog >= 41 && nlcd_2019_cog <= 43, 1, 0)"
r.mapcalc expression="forest_2001 = if(nlcd_2001_cog >= 40 && nlcd_2001_cog <= 43, 1, 0)"
r.neighbors -c input='forest' output='forest_smooth' size=37 method='average' memory=3000 nprocs=10
r.neighbors -c input='forest_2001' output='forest_2001_smooth' size=37 method='average' memory=3000 nprocs=10

r.mapcalc expression='urban_2001_nonull = if(isnull(urban_2001), 0, urban_2001)'
r.mapcalc expression='urban_2019_nonull = if(isnull(urban_2019), 0, urban_2019)'
r.futures.devpressure -n input='urban_2001_nonull' output='devpressure_30_05_01_2001' method='gravity' size=30 gamma=0.5 scaling_factor=0.1
r.futures.devpressure -n input='urban_2019_nonull' output='devpressure_30_05_01_2019' method='gravity' size=30 gamma=0.5 scaling_factor=0.1

# Rescaling 
r.mapcalc expression="dist_to_water_km = dist_to_water / 1000"
r.mapcalc expression="dist_to_protected_km = dist_to_protected / 1000"
# r.mapcalc expression="dist_to_city_center_km = dist_to_city_center / 1000"
# r.mapcalc expression="dist_to_interchanges_km = dist_to_interchanges / 1000"
# r.mapcalc expression="road_dens_perc = road_dens * 100"
r.mapcalc expression="forest_smooth_perc = forest_smooth * 100"
r.mapcalc expression="forest_2001_smooth_perc = forest_smooth * 100"

# Sampling
r.mapcalc expression="urban_change_01_19 = if(urban_2019 == 1, if(urban_2001 == 0, 1, null()), 0)"
r.mapcalc expression="urban_change_clip = if(counties, urban_change_01_19)"