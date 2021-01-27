FROM node:latest
ENV APP_PORT=80 APP_MONGOHOST=mongodb://pc-246.home:27017/facturation
RUN mkdir -p /usr/nodeapp
COPY . /usr/nodeapp
WORKDIR /usr/nodeapp
RUN npm install --verbose
CMD ["npx","ts-node","src/index.ts"]
