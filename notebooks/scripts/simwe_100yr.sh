g.region vector=counties@PERMANENT align=nlcd_2019_cog@PERMANENT
importer raster="elevation@https://storage.googleapis.com/tomorrownow-actinia-dev/SpatialData/LC20_Elev_220_cog.tif"
r.slope.aspect elevation=elevation dx=dx dy=dy
# r.recode input=nlcd_2019_cog@PERMANENT output=mannings rules=nlcd_to_mannings.txt
r.sim.water elevation=elevation dx=dx dy=dy depth=depth rain_value="79.248" infil_value=0 man_value=0.1 nwalk=100000 nprocs=14 output_step=60 niterations=60 random_seed=1