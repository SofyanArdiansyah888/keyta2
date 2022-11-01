FROM node:16-alpine

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
ADD yarn.lock /src/app
ADD package.json /src/app
RUN yarn add react-countdown
RUN cd /src/app && yarn install && yarn build
EXPOSE 3000
CMD ["yarn", "start"]
