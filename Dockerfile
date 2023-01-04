FROM node:16-alpine3.17
WORKDIR /app
COPY . /app
RUN npm install
RUN npx expo export:web
CMD ["npx","serve","web-build", "-l","tcp://0.0.0.0:80"]