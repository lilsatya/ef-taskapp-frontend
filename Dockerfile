

# Get node 10
FROM node:10

# Create app directory
WORKDIR /project

# Install app dependencies
COPY package*.json ./

# run yarn
RUN yarn

# Set development environment as default
ENV NODE_ENV development

# Bundle app source
COPY . .

RUN yarn build

COPY build .

EXPOSE 5000
CMD [ "serve", "build" ]
