r.futures.pga subregions='counties' developed='urban_2016' predictors='road_dens_perc,forest_smooth_perc,dist_to_water_km,slope,dist_to_interchanges_km' devpot_params='/src/actinia_core/potential.csv' development_pressure='devpressure_30_05_01_2016' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='/src/actinia_core/demand.csv', discount_factor='0.10' compactness_mean='0.00' compactness_range='0.100.10,0.00,0.10,0.96,0.29,0.63' patch_sizes='/src/actinia_core/patches.csv' num_neighbors=4 seed_search='probability' random_seed=1 output='final' output_series='step'

# CSV output are located in src/actina_core by default


# disc_factor: 0.10, comp_mean: 0.00, comp_range: 0.100.10,0.00,0.10,0.96,0.29,0.63
# from helper import show_interactively, adjust_futures_colors

# raster = adjust_futures_colors('final')
# show_interactively(raster)
# # We will patch projected development into 2016 NLCD and visualize it. We need to restrict the region because the file size is too large.
# gs.mapcalc("landuse_2038 = if(isnull(counties),null() , if (isnull(final), landuse_2016, if(final >=1, 21, landuse_2016)))")
# gs.run_command('r.colors', map='landuse_2038', raster='landuse_2016')
# gs.run_command('g.region', n=3985410, s=3947280, w=685200, e=731490)
# webmap = show_interactively('landuse_2038')
# gs.run_command('g.region', raster='urban_2016')