# TomorrowNowAPP

## Getting Started

Docker compose containers and client port bindings.
| Service  | Description | Port |
| -----------   | ----------- | -------- |
| api           | Django 4.0  | 8005     |
| actinia | Actinia 4.0 | 8088     |
| webapp      | React       | 3000     |
| db      | Postgresql + PostGIS | 5431 |

### Start app

```bash
docker-compose up
```

### Stop app

```bash
docker-compose down
```

## API

[Django Docker Docs](https://docs.docker.com/samples/django/)

### Create new app

Run inside of web container

```bash
docker-compose run api python manage.py startapp <appname>
```

Creates or updates models and store changes as a migration

```bash
# Create migrations
docker-compose run api python manage.py makemigrations <appname>

# Apply changes to database
docker-compose run api python manage.py migrate
```

### Collect Static Files

```bash
docker-compose run api python manage.py collectstatic
```

### View Django urls

```bash
docker-compose run api python manage.py show_urls
```

### Start Django Shell

```bash
docker-compose run api python manage.py shell
```

#### Start Django Jupyter Notebook

```bash
docker-compose run api python manage.py shell_plus --notebook
```

```python
from savana.utils import actinia
actinia.locations()
```

### Testing

```bash
docker-compose run api python manage.py test <appname>
```

## Front End (webapp/)

### Install new NPM modules

<https://www.docker.com/blog/keep-nodejs-rockin-in-docker/>

```bash

docker-compose run webapp npm install

```
