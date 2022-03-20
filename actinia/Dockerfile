FROM mundialis/actinia-core:3.1.2 as actinia

LABEL authors="Corey White"
LABEL maintainer="smortopahri@gmail.com"

USER root

RUN apt-get install -y r-base

RUN R -e "install.packages(c('MuMIn', 'lme4', 'optparse', 'snow'), dependencies=TRUE, repos='http://cran.rstudio.com/')"

RUN pip3 install scipy

COPY grass_addons_list.csv /src/grass_addons_list.csv
COPY actinia.cfg /etc/default/actinia
COPY start.sh /src/start.sh

ARG USER_ID=1000
ARG GROUP_ID=1000

RUN addgroup -g $GROUP_ID user
RUN adduser -D -g '' -u $USER_ID -G user user
RUN chown -R user:user /src/

USER user
