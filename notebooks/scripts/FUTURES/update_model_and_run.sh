# Status-Quo
g.region vector=counties@PERMANENT align=landuse_2016@PERMANENT

# Change the amount of growth with the methods.
# r.futures.demand development='urban_2001,urban_2006,urban_2011,urban_2016,urban_2019' subregions='counties' observed_population='population_trend.csv' projected_population='population_projection.csv' simulation_times='2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038' demand='demand.csv' separator='comma' method='logarithmic'

#######################################################################
# Encourage and Increase of infill or sprall
# incentive_power=float
#     Exponent to transform probability values p to p^x to simulate infill vs. sprawl
#     Values > 1 encourage infill, < 1 urban sprawl
#     Options: 0-10
#     Default: 1

# Infill = 4 
# Sprawl = 0.25
#######################################################################
# Encourage or decourage development
# potential_weight=name
#     Raster map of weights altering development potential
#     Values need to be between -1 and 1, where negative locally reducesprobability and positive increases probability.

####################################################################
# Landscape Fragmentationg Options

## Increase fragmentation
# discount_factor = 0.1 
# compactness_mean=0
# incentive_power=0.25

## Decrease Fragmentation
# discount_factor = 1 
# compactness_mean = 1
# incentive_power = 4


## Forest Fragmentation
# r.forestfrag

# New version r.futures simulation
r.futures.simulation subregions='counties' developed='urban_2019' predictors='road_dens_perc,forest_smooth_perc,dist_to_water_km' devpot_params='potential.csv' development_pressure='devpressure_30_05_01_2019' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='demand.csv' discount_factor='0.5' compactness_mean='0.4' compactness_range='0.1' patch_sizes='patches.csv' num_neighbors=4 seed_search='probability' random_seed=1 output='final' output_series='step'