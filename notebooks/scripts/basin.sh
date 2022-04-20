g.region raster=dem_10m_mosaic@https://storage.googleapis.com/tomorrownow-actinia-dev/dem_10m_mosaic_cog.tif res=10
r.circle -b output=circle coordinate='0,0' max=200
r.stream.basins -c direction=direction_3k coordinates='0,0' basins=point_basin