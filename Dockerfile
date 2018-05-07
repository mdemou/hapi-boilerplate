FROM node:8.10
LABEL maintainer="Javier Moure"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app
EXPOSE 9000
ENTRYPOINT ["node","server"]