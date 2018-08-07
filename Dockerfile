# Dockerfile web

FROM node:6.5.0

ENV HOME=.

WORKDIR $HOME COPY . $HOME RUN npm i 