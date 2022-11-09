# Status-Quo
g.region vector=counties align=nlcd_2019_cog

# New version r.futures simulation
r.futures.pga subregions='counties' developed='urban_2019' predictors='forest_smooth_perc,dist_to_water_km,dist_to_road' devpot_params='potential.csv' development_pressure='devpressure_30_05_01_2019' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='demand.csv' discount_factor='0.5' compactness_mean='0.4' compactness_range='0.1' patch_sizes='patches.csv' num_neighbors=4 seed_search='probability' random_seed=1 output='final' output_series='step'