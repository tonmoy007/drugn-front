FROM node:16-alpine3.17 as drugn-build
LABEL app="drugn"
MAINTAINER tonmoy
WORKDIR /app
COPY . /app
RUN npm install
RUN npx expo export:web

FROM node:16-alpine3.17 as main
WORKDIR /app
COPY --from=drugn-build /app/web-build /app/web-build
RUN cd /app/web-build
CMD ["npx", "live-server", "--entry-file=index.html","--port=80" ,"--host=http://0.0.0.0" ]