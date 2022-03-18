# FROM mundialis/grass-py3-pdal:8.0.1-debian as grass
FROM python:3

LABEL authors="Corey White"
LABEL maintainer="smortopahri@gmail.com"

ENV PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends --no-install-suggests \
        binutils \
        libgdal-dev \
        libgeos-dev \
        libproj-dev \
        geoip-database \
        postgis



# actinia params
# pip3 install click requests simplejson


# RUN ln -sf /usr/local/grass `grass --config path`

# # actinia importer installation
# RUN grass --tmp-location EPSG:4326 --exec g.extension extension=importer url=https://github.com/mundialis/importer

# # actinia exporter installation
# RUN grass --tmp-location EPSG:4326 --exec g.extension extension=exporter url=https://github.com/mundialis/exporter

# # ace (actinia command execution) tool
# RUN grass --tmp-location EPSG:4326 --exec g.extension extension=ace url=https://github.com/mundialis/ace

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/