# TomorrowNowAPP

[Django Docker Docs](https://docs.docker.com/samples/django/)

## Start app

```bash
docker-compose up
```

## Stop app

```bash
docker-compose down
```

## Create new app

Run inside of web container

```bash
python manage.py startapp <appname>
```

Creates or updates models and store changes as a migration

```bash
# Create migrations
docker-compose run python manage.py makemigrations <appname>

# Apply changes to database
docker-compose run api python manage.py migrate
```

## View Django urls

```bash
docker-compose run api python manage.py show_urls
```

## Start Django Shell

```bash
docker-compose run api python manage.py shell
```

## Testing

```bash
python manage.py test <appname>
```

## Install new NPM modules

<https://www.docker.com/blog/keep-nodejs-rockin-in-docker/>

```bash

docker-compose run webapp npm install

```
