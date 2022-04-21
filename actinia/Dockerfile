FROM mundialis/actinia-core:4.0.0 as actinia

LABEL authors="Corey White"
LABEL maintainer="smortopahri@gmail.com"
ENV ACTINIA_CORE_VERSION=4.0.0

# USER root

# Install R libraies needed for FUTURES
# RUN apt-get install -y r-base
# RUN R -e "install.packages(c('MuMIn', 'lme4', 'optparse', 'snow'), dependencies=TRUE, repos='http://cran.rstudio.com/')"

RUN pip3 install scipy

# Install additional GRASS plugins
COPY grass_addon_list.csv /src/grass_addon_list_custom.csv
RUN while IFS=, read -r ADDON SERVER; do if [[ $ADDON != "#*" ]]; then unset URL; test -z $SERVER || URL="url=$SERVER"; grass --tmp-location EPSG:4326 --exec g.extension -s extension=$ADDON $URL;fi;done < /src/grass_addon_list_custom.csv



# actinia-core and plugins installation
WORKDIR /build

ARG PLUGIN_VERSION=0.2.0
ARG WHEEL_NAME=actinia_statistic_plugin-${PLUGIN_VERSION}-py2.py3-none-any.whl
RUN curl -L --output /build/${WHEEL_NAME} \
    https://github.com/mundialis/actinia_statistic_plugin/releases/download/${PLUGIN_VERSION}/${WHEEL_NAME}

ARG PLUGIN_VERSION=0.1.0
ARG WHEEL_NAME=actinia_satellite_plugin-${PLUGIN_VERSION}-py2.py3-none-any.whl
RUN curl -L --output /build/${WHEEL_NAME} \
    https://github.com/mundialis/actinia_satellite_plugin/releases/download/${PLUGIN_VERSION}/${WHEEL_NAME}

ARG PLUGIN_VERSION=1.0.2
ARG WHEEL_NAME=actinia_metadata_plugin.wsgi-${PLUGIN_VERSION}-py2.py3-none-any.whl
RUN curl -L --output /build/${WHEEL_NAME} \
    https://github.com/mundialis/actinia-metadata-plugin/releases/download/${PLUGIN_VERSION}/${WHEEL_NAME}

ARG PLUGIN_VERSION=2.3.1
ARG WHEEL_NAME=actinia_module_plugin.wsgi-${PLUGIN_VERSION}-py2.py3-none-any.whl
RUN curl -L --output /build/${WHEEL_NAME} \
    https://github.com/mundialis/actinia-module-plugin/releases/download/${PLUGIN_VERSION}/${WHEEL_NAME}

ARG PLUGIN_VERSION=0.1.0
ARG WHEEL_NAME=actinia_stac_plugin.wsgi-${PLUGIN_VERSION}-py2.py3-none-any.whl
RUN curl -L --output /build/${WHEEL_NAME} \
    https://github.com/mundialis/actinia-stac-plugin/releases/download/${PLUGIN_VERSION}/${WHEEL_NAME}

# ENV PLUGIN_VERSION=3.1.0
# ARG WHEEL_NAME=actinia_tiling_plugin.wsgi-${PLUGIN_VERSION}}-py2.py3-none-any.whl
# RUN curl -L --output /build/${WHEEL_NAME} \
#     https://github.com/mundialis/actinia-tiling-plugin/releases/download/${PLUGIN_VERSION}}/${WHEEL_NAME}

ENV ACTINIA_API_VERSION=3.1.0
ARG WHEEL_NAME=actinia_api-${ACTINIA_API_VERSION}-py3-none-any.whl
RUN curl -L --output /build/${WHEEL_NAME} \
    https://github.com/mundialis/actinia-api/releases/download/${ACTINIA_API_VERSION}/${WHEEL_NAME}

RUN git clone --depth 1 --branch ${ACTINIA_CORE_VERSION} \
    https://github.com/mundialis/actinia_core.git /src/actinia_core
WORKDIR /src/actinia_core
RUN python3 setup.py sdist bdist_wheel -d /build

# Install actinia-core and plugins
RUN pip3 install /build/*

# Duplicate install actinia_core requirements. They are already included
# in alpine-build / alpine-runtime images, but check for updates here.
RUN pip3 install -r /src/actinia_core/requirements.txt

# # Copy Google Creds
RUN mkdir -p /home/user/gcp/
COPY gcp_keys/gcp_tomorrownow_dev_key.json /home/user/gcp/gcp_tomorrownow_dev_key.json

COPY actinia.cfg /etc/default/actinia
COPY start.sh /src/start.sh

# USER user