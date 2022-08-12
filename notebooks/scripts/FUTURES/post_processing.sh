r.futures.parallelpga subregions='counties' developed='urban_2016' predictors='road_dens_perc,forest_smooth_perc,dist_to_water_km,slope,dist_to_interchanges_km' devpot_params='potential.csv' development_pressure='devpressure_30_05_01_2016' n_dev_neighbourhood=30 development_pressure_approach='gravity' gamma=0.5 scaling_factor=0.1 demand='demand.csv' discount_factor='disc_factor' compactness_mean='comp_mean' compactness_range='comp_range' patch_sizes='patches.csv' num_neighbors=4 seed_search='probability' output='final' nprocs=10, repeat=5
               
# In this example we postprocess data from multiple stochastic runs to see which land category is most impacted by urban growth.


# import numpy as np
 
# # get information about how many cells there are of each land use category, use r.stats
# def stats(raster):
#     developed = agriculture = forest = other = 0
#     res = gs.read_command('r.stats', flags='cn', input=raster, quiet=True).strip()
#     for line in res.strip().splitlines():
#         cat, cells = line.split()
#         cat = int(cat)
#         cells = int(cells)
#         # developed
#         if 21 <= cat <= 24:
#             developed += cells
#         # agriculture
#         elif cat == 81 or cat == 82:
#             agriculture += cells
#         # forest
#         elif 41 <= cat <= 43:
#             forest += cells
#         # other land use
#         else:
#             other += cells
#     return developed, agriculture, forest, other

# # list maps computed by r.futures.parallelpga for one scenario
# current_mapset = gs.gisenv()['MAPSET']
# # put the name you are using for the scenarios in the pattern option 
# maps = gs.list_grouped('raster', pattern="final_run*")[current_mapset]
# developed = []
# forest = []
# agriculture = []
# other = []
# for each in maps:
#     # compute landcover in 2038 by updating landcover 2011 with the simulation results:
#     gs.mapcalc("landuse_2038_{name} = if(isnull({name}), landuse_2016, if({name} >=1, 21, landuse_2016))".format(name=each))
#     dev, agr, forst, othr = stats("landuse_2038_{name}".format(name=each))
#     developed.append(dev)
#     agriculture.append(agr)
#     forest.append(forst)
#     other.append(othr)

# dev_orig, agr_orig, forest_orig, other_orig = stats('landuse_2016')
 
# # convert to NumPy arrays
# forest = np.array(forest)
# agriculture = np.array(agriculture)
# other = np.array(other)
# developed = np.array(developed)