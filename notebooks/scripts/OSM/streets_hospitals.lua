-- 
--  Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/notebooks/scripts/OSM/streets_hospitals.
--  Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/notebooks/scripts/OSM
--  Created Date: Monday, November 28th 2022, 2:03:00 pm
--  Author: Corey White
--  
--  Copyright (c) 2022 Corey White
--

 local tables = {}

 tables.highways = osm2pgsql.define_way_table('highways', {
     { column = 'type', type = 'text' },
     { column = 'geom', type = 'linestring', projection = 4326 },
 })
 
 tables.boundaries = osm2pgsql.define_area_table('boundaries', {
     { column = 'tags', type = 'jsonb' },
     { column = 'geom', type = 'geometry', projection = 4326 },
 })

 tables.hospitals = osm2pgsql.define_table({
    name = 'hospitals',
    ids = { type = 'any', type_column = 'osm_type', id_column = 'osm_id' },
    columns = {
        { column = 'name' },
        { column = 'class', not_null = true },
        { column = 'subclass' },
        { column = 'geom', type = 'point', not_null = true, projection = 4326 },
}})

function osm2pgsql.process_node(object)
    if not object.tags.amenity then
        return
    end

    tables.hospitals:add_row{ 
        class = 'amenity',
        subclass = object.tags.amenity
    }
end

function osm2pgsql.process_way(object)
    if object.tags.highway then
        tables.highways:add_row{ type = object.tags.highway }
    end

    if object.is_closed and object.tags.building and object.tags.amenity then
        tables.hospitals:add_row{ 
            class = 'amenity',
            subclass = object.tags.amenity,
            geom = object.geom:as_polygon():as_centroid()
        }
    end
end
 
function osm2pgsql.process_relation(object)
    if object.tags.boundary == 'administrative' then
        tables.boundaries:add_row{
            tags = object.tags,
            geom = { create = 'area' }
        }
    end
end





