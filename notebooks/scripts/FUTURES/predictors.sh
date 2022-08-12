# Predictors
g.region vector=counties@PERMANENT align=landuse_2016@PERMANENT
# Slope
r.slope.aspect elevation="elevation" slope="slope"
# Distance from lakes/rivers
r.mapcalc expression="water = if(landuse_2016 == 11, 1, null())"
r.grow.distance input='water' distance='dist_to_water'
r.colors -en map='dist_to_water' color='blues'
# # Distance from protected areas
# r.null map='protected_areas@futures_test' setnull=0
# r.grow.distance input='protected_areas@futures_test' distance='dist_to_protected'
# r.colors map=dist_to_protected color='gyr' -e
# Forests
r.mapcalc expression="forest = if(landuse_2016 >= 41 && landuse_2016 <= 43, 1, 0)"
r.mapcalc expression="forest_2001 = if(landuse_2001 >= 40 && landuse_2001 <= 43, 1, 0)"
r.neighbors -c input='forest' output='forest_smooth' size=37 method='average' memory=3000 nprocs=10
r.neighbors -c input='forest_2001' output='forest_2001_smooth' size=37 method='average' memory=3000 nprocs=10
r.colors map='forest_smooth,forest_2001_smooth' color='ndvi'
r.grow.distance input='city_center' distance='dist_to_city_center'
# Distance to interchanges
v.to.rast input='interchanges' type='line' use='val' output='interchanges'
r.grow.distance input='interchanges' distance='dist_to_interchanges'
# Road Density
r.neighbors -c input='roads' output='road_dens' size=37 method='average' memory=3000 nprocs=10