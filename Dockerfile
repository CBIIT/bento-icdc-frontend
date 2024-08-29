#FROM node:20-alpine as build
FROM nginx:1.27.1-alpine-slim as build

WORKDIR /usr/src/app

COPY package*.json .

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm set progress=false

RUN NODE_OPTIONS="--max-old-space-size=4096" npm ci --legacy-peer-deps

RUN NODE_OPTIONS="--openssl-legacy-provider --max-old-space-size=4096 " npm run build --verbose 

# Final Stage
FROM nginx:1.25.4-alpine3.18 AS fnl_base_image

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/configure/inject.template.js /usr/share/nginx/html/inject.template.js
COPY --from=build /usr/src/app/configure/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /usr/src/app/configure/entrypoint.sh /

ENV PORT 80

ENV HOST 0.0.0.0

RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

EXPOSE 80

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
