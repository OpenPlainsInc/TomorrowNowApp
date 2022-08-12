# Development Potential
g.region vector=counties@PERMANENT align=landuse_2016@PERMANENT

### pre-selected combination of predictors:
r.futures.potential input='sampling' output='potential.csv' columns='devpressure_30_05_01_2001,road_dens_perc,forest_2001_smooth_perc,dist_to_water_km,slope,dist_to_interchanges_km' developed_column='urban_change_clip' subregions_column='counties'

r.futures.potsurface input='potential.csv' subregions='counties' output='suitability'
r.colors map='suitability' color='byr'