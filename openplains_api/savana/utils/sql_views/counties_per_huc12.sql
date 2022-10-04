/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/savana/utils/sql_views/counties_per_huc12.sql
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/savana/utils/sql_views
 * Created Date: Friday, September 9th 2022, 11:49:43 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

SELECT 
	count (counties.id) as counties_per_huc12,
	huc12.id,
	huc12.huc12,
	huc12.name as huc12_name,
	huc12.geom
FROM public.cb_2018_us_county_500k as counties
JOIN public."wbdhu12_a_us_september2021 — WBDHU12" as huc12
ON ST_Intersects(huc12.geom, ST_Transform(counties.geom, 4326))
GROUP BY 
    huc12.id,
	huc12_name,
	huc12.huc12,
	huc12.geom
HAVING COUNT(counties.id) > 1;