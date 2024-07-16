# fortune_web_server

Fortune Web REST API written in python using Django

## Getting started

Make sure you've Docker installed.

Compose docker up

```
cd fortune_web_server
docker compose up
```


Run the tests in related container

```
python manage.py test
```

Hit the API

```
GET http://0.0.0.0:8000/api/fortune/
POST http://0.0.0.0:8000/api/fortune/
```