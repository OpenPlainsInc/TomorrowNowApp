# TomorrowNowAPP

(Django Docker Docs)[https://docs.docker.com/samples/django/]


## Start app
```
docker-compose up
```

## Stop app
```
docker-compose down
```

## Create new app
Run inside of web container
```
python manage.py startapp <appname>
```

Creates or updates models and store changes as a migration
```
# Create migrations
python manage.py makemigrations <appname>

# Apply changes to database
python manage.py migrate
```

## Open Python shell to interact with Django API
```
python manage.py shell
```

## Testing
```
python manage.py test <appname>
```


## Install new NPM modules

<https://www.docker.com/blog/keep-nodejs-rockin-in-docker/>

```bash

docker-compose run webapp npm install

```
