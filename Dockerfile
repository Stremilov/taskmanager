FROM node:18 AS build

WORKDIR /opt/node_app

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=build /opt/node_app/build /usr/share/nginx/html/board

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]