FROM node:16

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin 



WORKDIR /code

# Copies package.json and package-lock.json to Docker environment
COPY --chown=node:node package*.json ./
RUN mkdir -p /code/node_modules/.cache
RUN npm install --no-optional && npm cache clean --force
RUN npm install -g react-scripts

COPY . /code/
USER node