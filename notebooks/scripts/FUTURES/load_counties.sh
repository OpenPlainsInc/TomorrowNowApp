v.in.ogr input="PG:host=db port=5432 dbname=actinia user=actinia password=actinia" layer=cb_2018_us_county_500k where="geoid in ('48113','48397','48085','48439','48121')" output=counties location="cb_2018_us_county_500k"

v.proj in=counties location=cb_2018_us_county_500k mapset=PERMANENT

# v.external input="PG:host=db port=5432 dbname=actinia" layer=cb_2018_us_county_500k output=counties