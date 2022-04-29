g.region align=direction_3k_10m_d@basin_test n='252702.4094174725' e='618028.8126522538' s='229056.70015573464' w='598579.6858165322'
r.circle -b output=circle coordinate='601225.5895524962,241014.7657618352' max=200
r.stream.basins -c direction=direction_3k_10m_d@basin_test stream_rast=circle basins=point_basin_cloud memory=1500
r.to.vect input=point_basin_cloud output=point_basin_cloud type=area column=value
r.mask raster=point_basin_cloud
r.stats input=nlcd_2016@basin_test separator="," output="point_basin_stats.csv" -alnpc
v.out.ogr in=point_basin_cloud output='PG:host=db port=5432 dbname=actinia user=actinia password=actinia' format=PostgreSQL type=area
# v.external.out input='PG:dbname=actinia user=actinia password=actinia' format=PostgreSQL
