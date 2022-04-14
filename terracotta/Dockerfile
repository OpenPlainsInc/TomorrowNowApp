
# https://github.com/DHI-GRAS/terracotta
# https://terracotta-python.readthedocs.io/en/latest/tutorials/wsgi.html

FROM continuumio/miniconda3


LABEL authors="Corey White"
LABEL maintainer="smortopahri@gmail.com"



ENV TERRACOATTA_VERSION="v0.7.5"
ENV TERRACOATTA_REPO="https://github.com/DHI-GRAS/terracotta.git"
# DEBUG=true
# FLASK_PROFILE=true

# [cors]
ENV TC_ALLOWED_ORIGINS_METADATA='["*"]'
ENV TC_ALLOWED_ORIGINS_TILES='["*"]'

RUN apt-get update && apt-get install --yes \
    git \
    curl \
    build-essential \
    gdal-bin \
    libgdal-dev


# RUN mkdir -p /home/gittmp
# WORKDIR /home/gittmp   
# RUN git clone ${TERRACOATTA_REPO}

# RUN echo $(ls -1 /home/gittmp)
RUN pip install terracotta
WORKDIR /app

# COPY terracotta/. .
# RUN mv -v /home/gittmp/terracotta/* /app/



# Remove original repo


# Create the environment:
# Add for custom env file
# COPY environment.yml .
# RUN conda env create -f environment.yml
# RUN pip install -e .
# Make RUN commands use the new environment:
# SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

# # Demonstrate the environment is activated:
# RUN echo "Make sure flask is installed:"
# RUN python -c "import flask"
RUN mkdir -p /data/optimized/
COPY ./data /app/data/
WORKDIR /app/data/dem
# RUN terracotta optimize-rasters data/dem/*.tif -o data/optimized/dem
RUN terracotta optimize-rasters ql2_10m.tif --reproject --resampling-method bilinear --overwrite -o ../optimized/
WORKDIR /app/data/rgb
# RUN terracotta optimize-rasters data/rgb/*.tif -o data/optimized/rgb
RUN terracotta optimize-rasters odm_orthophoto.tif --reproject --resampling-method bilinear --overwrite -o ../optimized/
WORKDIR /app/data/optimized
# RUN terracotta ingest /app/data/optimized/{type}/{source}_{name}.tif -o /app/data/optimized/actinia.sqlite
RUN terracotta ingest ./{type}/{source}_{name}.tif -o ./actinia.sqlite
COPY config.toml .

# RUN terracotta -c config.toml serve -d actinia.sqlite
# RUN terracotta serve -d actinia.sqlite --debug --allow-all-ips




ENTRYPOINT [ "terracotta", "serve", "-d", "actinia.sqlite", "--debug", "--allow-all-ips"]
# ENTRYPOINT [ "terracotta", "serve", "-r", "{type}/{source}_{name}.tif", "--debug", "--allow-all-ips"]

# RUN terracotta connect --no-browser 127.0.0.1:5001

EXPOSE 5000:5000

