FROM node:18.12.1
WORKDIR /usr/src/app 
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD [ "yarn", "start:dev" ]