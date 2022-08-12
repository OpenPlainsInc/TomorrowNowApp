g.region vector=counties@PERMANENT align=landuse_2016@PERMANENT

r.mapcalc expression='urban_2001_nonull = if(isnull(urban_2001), 0, urban_2001)'
r.mapcalc expression='urban_2016_nonull = if(isnull(urban_2016), 0, urban_2016)'
r.futures.devpressure -n input='urban_2001_nonull' output='devpressure_30_05_01_2001' method='gravity' size=30 gamma=0.5 scaling_factor=0.1
r.futures.devpressure -n input='urban_2016_nonull' output='devpressure_30_05_01_2016' method='gravity' size=30 gamma=0.5 scaling_factor=0.1


# for name in ['slope', 'dist_to_water', 'dist_to_protected',
#              'forest_smooth', 'forest_2001_smooth', 'dist_to_city_center', 'dist_to_interchanges',
#              'road_dens', 'devpressure_30_05_01_2001', 'devpressure_30_05_01_2016']:
#     minmax = gs.raster_info(name)
#     print (name, minmax['min'], minmax['max'])

# Rescaling 
r.mapcalc expression="dist_to_water_km = dist_to_water / 1000"
r.mapcalc expression="dist_to_protected_km = dist_to_protected / 1000"
r.mapcalc expression="dist_to_city_center_km = dist_to_city_center / 1000"
r.mapcalc expression="dist_to_interchanges_km = dist_to_interchanges / 1000"
r.mapcalc expression="road_dens_perc = road_dens * 100"
r.mapcalc expression="forest_smooth_perc = forest_smooth * 100"
r.mapcalc expression="forest_2001_smooth_perc = forest_smooth * 100"

# Sampling
r.mapcalc expression="urban_change_01_16 = if(urban_2016 == 1, if(urban_2001 == 0, 1, null()), 0)"
r.mapcalc expression="urban_change_clip = if(counties, urban_change_01_16)"

r.sample.category input='urban_change_clip' output='sampling' sampled='counties,devpressure_30_05_01_2001,slope,road_dens_perc,forest_2001_smooth_perc,dist_to_water_km,dist_to_protected_km,dist_to_city_center_km,dist_to_interchanges_km' npoints='1000,400'