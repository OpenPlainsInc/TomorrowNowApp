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

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/