FROM python:3.9

ENV PORT=7000

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install uvicorn

COPY ./app /code/app

CMD uvicorn titiler.application.main:app --host 0.0.0.0 --port ${PORT}
# ENTRYPOINT ["uvicorn", "titiler.application.main:app", "--host", "0.0.0.0", "--port", ${PORT}]

