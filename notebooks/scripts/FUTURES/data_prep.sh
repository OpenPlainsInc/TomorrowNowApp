g.region vector=counties@PERMANENT align=landuse_2016@PERMANENT
v.to.rast input='protected_areas' output='protected_areas' use='val'
r.null map='protected_areas' null=0
r.mapcalc expression="urban_2001 = if(landuse_2001 >= 21 && landuse_2001 <= 24, 1, if(landuse_2001 == 11 || landuse_2001 >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2006 = if(landuse_2006 >= 21 && landuse_2006 <= 24, 1, if(landuse_2006 == 11 || landuse_2006 >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2011 = if(landuse_2011 >= 21 && landuse_2011 <= 24, 1, if(landuse_2011 == 11 || landuse_2011 >= 90 || protected_areas, null(), 0))"
r.mapcalc expression="urban_2016 = if(landuse_2016 >= 20 && landuse_2016 <= 24, 1, if(landuse_2016 == 11 || landuse_2016 >= 90 || protected_areas, null(), 0))"
v.to.rast input='counties' type='area' use='attr' attribute_column='value' output='counties'

# Distance from protected areas
r.null map='protected_areas' setnull=0
r.grow.distance input='protected_areas' distance='dist_to_protected'
r.colors map=dist_to_protected color='gyr' -e