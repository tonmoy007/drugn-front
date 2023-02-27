FROM node:16-alpine3.17 as drugn-build
LABEL app="drugn"
MAINTAINER tonmoy
WORKDIR /app
COPY . /app
RUN npm install
RUN cp -R ./external/expo-camer /app/node_modules/expo-camera
CMD ["npm","run","web"]

#FROM node:16-alpine3.17 as main
#WORKDIR /web-build
#COPY --from=drugn-build /app/web-build /web-build
#CMD ["npx", "live-server", "--entry-file=index.html","--port=80" ,"--host=0.0.0.0" ]