FROM node:16-alpine3.17 as drugn-build
LABEL app="drugn"
MAINTAINER tonmoy
WORKDIR /app
COPY . /app
RUN yarn install
RUN npx expo export:web
FROM node:16-alpine3.17 as main
WORKDIR /web-build
COPY --from=drugn-build /app/web-build /web-build
CMD ["npx", "serve" ,"/web-build/"]