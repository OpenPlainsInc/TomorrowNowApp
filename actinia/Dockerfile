FROM mundialis/actinia-core:4.0.0 as actinia

LABEL authors="Corey White"
LABEL maintainer="smortopahri@gmail.com"

USER root

# Install R libraies needed for FUTURES
# RUN apt-get install -y r-base
# RUN R -e "install.packages(c('MuMIn', 'lme4', 'optparse', 'snow'), dependencies=TRUE, repos='http://cran.rstudio.com/')"

RUN pip3 install scipy

# Install additional GRASS plugins
COPY grass_addon_list.csv /src/grass_addon_list_custom.csv
RUN while IFS=, read -r ADDON SERVER; do if [[ $ADDON != "#*" ]]; then unset URL; test -z $SERVER || URL="url=$SERVER"; grass --tmp-location EPSG:4326 --exec g.extension -s extension=$ADDON $URL;fi;done < /src/grass_addon_list_custom.csv

# # Copy Google Creds
# RUN mkdir -p /home/user/gcp/
# COPY gcp_keys/gcp_tomorrownow_dev_key.json /home/user/gcp/gcp_tomorrownow_dev_key.json

# COPY actinia.cfg /etc/default/actinia
# COPY start.sh /src/start.sh

USER user