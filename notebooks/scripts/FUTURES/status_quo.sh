# Set Region
g.region vector=counties align=nlcd_2019_cog

## Status Quo

# Development Potential 
r.futures.potential input='sampling' output='$file::potential.csv' columns='devpressure_30_05_01_2001,forest_2001_smooth_perc,dist_to_water_km,dist_to_road_km' developed_column='urban_change_clip' subregions_column='counties' nprocs="10"

# we dont need this now
# r.futures.potsurface input='$file::potential.csv' subregions='counties' output='suitability'
# r.colors map='suitability' color='byr'

r.mask -i raster=roads_2020 maskcats=1
r.futures.calib development_start='urban_2001' development_end='urban_2019' subregions='counties' patch_sizes='$file::patches.csv' patch_threshold=1800 nprocs=10 -ls

# Change the amount of growth with the methods.
r.futures.demand development='urban_2001,urban_2004,urban_2006,urban_2008,urban_2011,urban_2013,urban_2016,urban_2019' subregions='counties' observed_population='$file::observed_population.csv' projected_population='$file::projected_population.csv' simulation_times='2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038' demand='$file::demand.csv' separator='comma' method='logarithmic'

r.mask -r

r.futures.simulation subregions='counties' developed='urban_2019' predictors='forest_smooth_perc,dist_to_water_km,dist_to_road' devpot_params='$file::potential.csv' development_pressure='devpressure_30_05_01_2019' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='$file::demand.csv' discount_factor='0.5' compactness_mean='0.4' compactness_range='0.1' patch_sizes='$file::patches.csv' num_neighbors=4 seed_search='probability' random_seed=1 output='status_quo_final' output_series='status_quo_step'