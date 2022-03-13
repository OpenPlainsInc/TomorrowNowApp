FROM node:16

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin 



WORKDIR /code

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
RUN mkdir -p /code/node_modules/.cache
RUN npm install
RUN npm install -g react-scripts

COPY . /code/