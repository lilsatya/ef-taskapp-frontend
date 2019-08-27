

# Get node 10
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# run yarn
RUN yarn

# build the app
RUN yarn build

# Set development environment as default
ENV NODE_ENV development

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "serve", "build" ]
