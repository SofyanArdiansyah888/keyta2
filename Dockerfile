FROM node:16-bullseye

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app/
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm run start