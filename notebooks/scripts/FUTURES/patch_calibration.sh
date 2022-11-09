# Patch Calibration (Skip calibration for now)
g.region vector=counties@PERMANENT align=landuse_2016@PERMANENT
r.mask raster='roads' maskcats=0
r.futures.calib development_start='urban_2001' development_end='urban_2016' subregions='counties' patch_sizes='patches.csv' patch_threshold=1800 -ls       
r.mask -r
# (Skip calibration for now)
# r.futures.calib development_start='urban_2001' development_end='urban_2016' subregions='counties' patch_sizes='patches.csv' patch_threshold=1800 -s repeat=5 calibration_results='calib.csv' nprocs=5 predictors='road_dens_perc,forest_smooth_perc,dist_to_water_km,slope,dist_to_interchanges_km' devpot_params='potential.csv' development_pressure='devpressure_30_05_01_2016' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='demand.csv' discount_factor=0.1 compactness_mean='0,0.2,0.4' compactness_range=0.1 num_neighbors=4 seed_search='probability' random_seed=1
            
# We will look at the calibration file. First line shows the parameters with lowest combined error:
# !cat calib.csv
# We will save the values from the first line to use them in the FUTURES call:
# with open('') as f:
#     disc_factor, comp_mean, comp_range = f.readlines()[1].split(',')[:3]