#!/bin/bash
# Example workflow
# mkdir -p optimized
# for file in *.TIF
# do
#    gdal_translate "$file" "optimized/$file" \
#      -co TILED=YES -co BLOCKXSIZE=512 -co BLOCKYSIZE=512 \
#      -co COMPRESS=LZW -co PREDICTOR=2 \
#      -co COPY_SRC_OVERVIEWS=YES -co BIGTIFF=YES
# done

# # Merging Files
# gdalbuildvrt eu_dem_v11.vrt *.TIF


# # Example single file workflow
# # Add multiple coverage resolutions
# gdaladdo -r average ~/Downloads/dem_10m_mosaic.tif 2 4 8 16

# # Covert to COG
# gdal_translate ~/Downloads/dem_10m_mosaic.tif \
#     ~/Downloads/dem_10m_mosaic_cog.tif \
#     -co TILED=YES \
#     -co BLOCKXSIZE=512 \
#     -co BLOCKYSIZE=512 \
#     -co COMPRESS=LZW \
#     -co COPY_SRC_OVERVIEWS=YES \
#     -co BIGTIFF=YES

# terracotta optimize-rasters *.tif -o optimized/
# terracotta ingest optimized/S2A_{date}_{}_{tile}_{band}.tif -o actinia.sqlite

# https://trac.osgeo.org/gdal/wiki/CloudOptimizedGeoTIFF