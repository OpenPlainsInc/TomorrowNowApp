/*
 * Filename: ncParcelsPoly.js
 * Project: TomorrowNow
 * File Created: Thursday March 31st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Mar 31 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */

/*
 * Polygons
 * https://www.nconemap.gov/datasets/nconemap::north-carolina-parcels-polygons/about
 * WMS: https://services.nconemap.gov/secure/services/NC1Map_Parcels/MapServer/WMSServer?request=GetCapabilities&service=WMS
 * WFS: https://services.nconemap.gov/secure/services/NC1Map_Parcels/MapServer/WFSServer?request=GetCapabilities&service=WFS
 * GeoService: https://services.nconemap.gov/secure/rest/services/NC1Map_Parcels/MapServer/1/query?outFields=*&where=1%3D1
 * Geojson: https://opendata.arcgis.com/datasets/1de3d7d828ce4813b838ddf055b40317_1.geojson
 * 
 * Centroids
 * https://www.nconemap.gov/datasets/nconemap::north-carolina-parcels-centroids/about
 * Metadata: https://www.arcgis.com/sharing/rest/content/items/943c5690291445c4bb679a7422dd8b93/info/metadata/metadata.xml?format=default&output=html
 * WMS: https://services.nconemap.gov/secure/services/NC1Map_Parcels/MapServer/WMSServer?request=GetCapabilities&service=WMS
 * WFS: https://services.nconemap.gov/secure/services/NC1Map_Parcels/MapServer/WFSServer?request=GetCapabilities&service=WFS
 * GeoService: https://services.nconemap.gov/secure/rest/services/NC1Map_Parcels/MapServer/0/query?outFields=*&where=1%3D1
 * Geojson: https://opendata.arcgis.com/datasets/943c5690291445c4bb679a7422dd8b93_0.geojson
*/
 
