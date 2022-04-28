g.region raster=direction_3k res=10 -a
r.resample input=direction_3k output=direction_3k_10m_d --overwrite
r.mapcalc expression="direction_3k_10m = if(direction_3k_10m_d, int(direction_3k_10m_d), null())" --overwrite