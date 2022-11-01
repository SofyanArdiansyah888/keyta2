FROM node:16-alpine

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
#RUN yarn install --frozen-lockfile
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
