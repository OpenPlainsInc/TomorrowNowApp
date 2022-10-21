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

# Install Actinia Python Client
ENV ACTINIA_CLI_VERSION="0.1.2"
# RUN wget https://github.com/mundialis/actinia-python-client/releases/download/$ACTINIA_CLI_VERSION/actinia_python_client-$ACTINIA_CLI_VERSION-py3-none-any.whl
# RUN pip install actinia_python_client-$ACTINIA_CLI_VERSION-py3-none-any.whl

# Temp work around because the lastest version with my changes isn't released yet.
WORKDIR /tmp
RUN wget https://github.com/mundialis/actinia-python-client/archive/refs/heads/main.zip
RUN pip install -e .

COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

RUN pip install newrelic
ADD newrelic.ini /code/
ENV NEW_RELIC_CONFIG_FILE=newrelic.ini 
# CMD [ "newrelic-admin", "run-program"] 