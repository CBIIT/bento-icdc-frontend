FROM node:15.13.0-alpine   as build

WORKDIR /usr/src/app

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm set progress=false

RUN NODE_OPTIONS="--max-old-space-size=4096" npm ci

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build --verbose

FROM nginx:1.23.3-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/configure/inject.template.js /usr/share/nginx/html/inject.template.js
COPY --from=build /usr/src/app/configure/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /usr/src/app/configure/entrypoint.sh /

ENV PORT 80

ENV HOST 0.0.0.0

RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

EXPOSE 80

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
