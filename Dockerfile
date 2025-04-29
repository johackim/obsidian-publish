FROM node:22 AS build

ENV NEXT_TELEMETRY_DISABLED=1

RUN apt update && apt install -y chromium

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

RUN rm -rf node_modules

FROM gcr.io/distroless/nodejs22

WORKDIR /app

COPY --from=build /app/.next/standalone ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["server.js"]
