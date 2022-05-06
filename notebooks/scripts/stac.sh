g.region raster=elevation res=10

r.in.gdal input=/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif output=nlcd_2019_cog -r
r.slope.aspect elevation=3dep slope=3dep_10m_slope --overwrite