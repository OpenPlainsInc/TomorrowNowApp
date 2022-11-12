g.region vector=counties@futures_test align=nlcd_2019_cog@futures_test

# Development Potential 
r.futures.potential input='sampling@futures_test' output='$file::potential' columns='devpressure_30_05_01_2001,forest_2001_smooth_perc,dist_to_water_km,dist_to_road_km' developed_column='urban_change_clip' subregions_column='counties' nprocs="10"


r.mask -i raster=roads_2020 maskcats=1
r.futures.calib development_start='urban_2001@futures_test' development_end='urban_2019@futures_test' subregions='counties@futures_test' patch_sizes='$file::patches' patch_threshold=1800 nprocs=10 -ls

# r.futures.demand development='urban_2001@futures_test,urban_2004@futures_test,urban_2006@futures_test,urban_2008@futures_test,urban_2011@futures_test,urban_2013@futures_test,urban_2016@futures_test,urban_2019@futures_test' subregions='counties@futures_test' observed_population='$file::observed_population.csv' projected_population='$file::projected_population.csv' simulation_times='2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038' demand='$file::demand' separator='comma' method='logarithmic'


r.mask -r