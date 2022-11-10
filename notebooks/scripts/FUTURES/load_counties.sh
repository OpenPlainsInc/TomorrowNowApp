# Request to import and reproject county data
v.in.ogr input="PG:host=db port=5432 dbname=actinia user=actinia password=actinia" layer=cb_2018_us_county_500k where="geoid in ('48113','48397','48085','48439','48121')" output=counties location="cb_2018_us_county_500k"
v.proj in=counties location=cb_2018_us_county_500k mapset=PERMANENT

# Load NLCD data for each year
g.region res=30 vector=counties
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif memory=10000 extent=region output=nlcd_2019_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2016_cog.tif memory=10000 extent=region output=nlcd_2016_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2013_cog.tif memory=10000 extent=region output=nlcd_2013_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2011_cog.tif memory=10000 extent=region output=nlcd_2011_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2008_cog.tif memory=10000 extent=region output=nlcd_2008_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2006_cog.tif memory=10000 extent=region output=nlcd_2006_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2004_cog.tif memory=10000 extent=region output=nlcd_2004_cog resolution=region
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2001_cog.tif memory=10000 extent=region output=nlcd_2001_cog resolution=region

# # Import Roads
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/SpatialData/LC20_Roads_220_cog.tif memory=10000 extent=region output=roads_2020_cog resolution=region

g.region vector=counties align=nlcd_2019_cog

# # Distance from protected areas
r.import input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/SpatialData/PADUS3_0_Raster_CONUS_cog.tif memory=10000 extent=region output=protected_areas_cog resolution=region
r.mapcalc expression="protected_areas = if( protected_areas_cog < 7890, 1, null())"
r.grow.distance input="protected_areas" distance='dist_to_protected'
r.null map='protected_areas' null=0

r.mapcalc expression="urban_2001 = if(nlcd_2001_cog >= 21 && nlcd_2001_cog <= 24, 1, if(nlcd_2001_cog == 11 || nlcd_2001_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2004 = if(nlcd_2004_cog >= 21 && nlcd_2004_cog <= 24, 1, if(nlcd_2004_cog == 11 || nlcd_2004_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2006 = if(nlcd_2006_cog >= 21 && nlcd_2006_cog <= 24, 1, if(nlcd_2006_cog == 11 || nlcd_2006_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2008 = if(nlcd_2008_cog >= 21 && nlcd_2008_cog <= 24, 1, if(nlcd_2008_cog == 11 || nlcd_2008_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2011 = if(nlcd_2011_cog >= 21 && nlcd_2011_cog <= 24, 1, if(nlcd_2011_cog == 11 || nlcd_2011_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2013 = if(nlcd_2013_cog >= 21 && nlcd_2013_cog <= 24, 1, if(nlcd_2013_cog == 11 || nlcd_2013_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2016 = if(nlcd_2016_cog >= 20 && nlcd_2016_cog <= 24, 1, if(nlcd_2016_cog == 11 || nlcd_2016_cog >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2019 = if(nlcd_2019_cog >= 20 && nlcd_2019_cog <= 24, 1, if(nlcd_2019_cog == 11 || nlcd_2019_cog >= 90 || protected_areas, null(), 0))"

# # Convert counties to rasters with geoid as value
v.db.addcolumn map=counties columns="geoid_value int"
v.db.update map=counties column="geoid_value" query_column="geoid"
v.to.rast input=counties layer=1 type=area use=attr attribute_column="geoid_value" memory=3000 output=counties



# # Distance from Roads
r.mapcalc expression="roads_2020 = if(roads_2020_cog >= 20 && roads_2020_cog <= 22, 1, null())"
r.grow.distance input='roads_2020' distance='dist_to_road'

# # Distance from lakes/rivers
r.mapcalc expression="water = if(nlcd_2019_cog == 11, 1, null())"
r.grow.distance input='water' distance='dist_to_water'

# # Forests
r.mapcalc expression="forest = if(nlcd_2019_cog >= 41 && nlcd_2019_cog <= 43, 1, 0)"
r.mapcalc expression="forest_2001 = if(nlcd_2001_cog >= 40 && nlcd_2001_cog <= 43, 1, 0)"
# # 37 is the size of 1km2
r.neighbors -c input='forest' output='forest_smooth' size=37 method='average' memory=3000 nprocs=10
r.neighbors -c input='forest_2001' output='forest_2001_smooth' size=37 method='average' memory=3000 nprocs=10

# # Development Pressure
r.mapcalc expression='urban_2001_nonull = if(isnull(urban_2001), 0, urban_2001)'
r.mapcalc expression='urban_2019_nonull = if(isnull(urban_2019), 0, urban_2019)'

# # Scaling factor needs to be the same in r.futures call
r.futures.devpressure -n input='urban_2001_nonull' output='devpressure_30_05_01_2001' method='gravity' size=30 gamma=0.5 scaling_factor=0.1 nprocs=10
r.futures.devpressure -n input='urban_2019_nonull' output='devpressure_30_05_01_2019' method='gravity' size=30 gamma=0.5 scaling_factor=0.1 nprocs=10

# # Rescaling 
r.mapcalc expression="dist_to_water_km = dist_to_water / 1000"
r.mapcalc expression="dist_to_road_km = dist_to_road / 1000"
r.mapcalc expression="dist_to_protected_km = dist_to_protected / 1000"
# r.mapcalc expression="dist_to_city_center_km = dist_to_city_center / 1000"
# r.mapcalc expression="dist_to_interchanges_km = dist_to_interchanges / 1000"
# r.mapcalc expression="road_dens_perc = road_dens * 100"
r.mapcalc expression="forest_smooth_perc = forest_smooth * 100"
r.mapcalc expression="forest_2001_smooth_perc = forest_smooth * 100"

# # Sampling
r.mapcalc expression="urban_change_01_19 = if(urban_2019 == 1, if(urban_2001 == 0, 1, null()), 0)"
r.mapcalc expression="urban_change_clip = if(counties, urban_change_01_19)"
r.sample.category input='urban_change_clip' output='sampling' sampled='counties,devpressure_30_05_01_2001,forest_2001_smooth_perc,dist_to_water_km,dist_to_protected_km,dist_to_road_km' npoints='1000,400'

# Development Potential 
r.futures.potential input='sampling' output='$file::potential.csv' columns='devpressure_30_05_01_2001,forest_2001_smooth_perc,dist_to_water_km,dist_to_road_km' developed_column='urban_change_clip' subregions_column='counties' nprocs="10"

# we dont need this now
# r.futures.potsurface input='$file::potential.csv' subregions='counties' output='suitability'
# r.colors map='suitability' color='byr'


# r.mask raster='roads_2020' maskcats=0
r.mask -i raster=roads_2020 maskcats=1
r.futures.calib development_start='urban_2001' development_end='urban_2019' subregions='counties' patch_sizes='$file::patches.csv' patch_threshold=1800 nprocs=10 -ls
## r.futures.calib development_start='urban_2001' development_end='urban_2019' subregions='counties' patch_sizes='patches.csv' patch_threshold=1800 nprocs=10 -ls

# Change the amount of growth with the methods.
r.futures.demand development='urban_2001,urban_2004,urban_2006,urban_2008,urban_2011,urban_2013,urban_2016,urban_2019' subregions='counties' observed_population='$file::observed_population.csv' projected_population='$file::projected_population.csv' simulation_times='2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038' demand='$file::demand.csv' separator='comma' method='logarithmic'
## r.futures.demand development='urban_2001,urban_2004,urban_2006,urban_2008,urban_2011,urban_2013,urban_2016,urban_2019' subregions='counties' observed_population='$file::observed_population.csv' projected_population='$file::projected_population.csv' simulation_times='2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038' demand='demand.csv' separator='comma' method='logarithmic'

r.mask -r

r.futures.simulation subregions='counties' developed='urban_2019' predictors='forest_smooth_perc,dist_to_water_km,dist_to_road' devpot_params='$file::potential.csv' development_pressure='devpressure_30_05_01_2019' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='$file::demand.csv' discount_factor='0.5' compactness_mean='0.4' compactness_range='0.1' patch_sizes='$file::patches.csv' num_neighbors=4 seed_search='probability' random_seed=1 output='final' output_series='step'
## r.futures.pga subregions='counties' developed='urban_2019' predictors='forest_smooth_perc,dist_to_water_km,dist_to_road' devpot_params='potential.csv' development_pressure='devpressure_30_05_01_2019' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='demand.csv' discount_factor='0.5' compactness_mean='0.4' compactness_range='0.1' patch_sizes='patches.csv' num_neighbors=4 seed_search='probability' random_seed=1 output='final' output_series='step'