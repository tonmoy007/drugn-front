FROM node:16-alpine3.17
WORKDIR /app
COPY . /app
RUN npm install
RUN npx expo export:web
CMD ["npx", "http-server", "web-build" ,"-P", "http://0.0.0.0?" ,"--port", "80"]