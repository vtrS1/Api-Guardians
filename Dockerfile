FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install 
COPY . .
EXPOSE 3000
RUN yarn install 
USER node
CMD ["yarn", "start:dev"]
