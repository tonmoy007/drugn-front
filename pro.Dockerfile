FROM node:16-alpine3.17 as main
WORKDIR /web-build
COPY --from=drugn-build /app/web-build /web-build
CMD ["npx", "live-server", "--entry-file=index.html","--port=19006" ,"--host=0.0.0.0" ]