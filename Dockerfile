

# Get node 10
FROM node:10

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# run yarn
RUN yarn

# Set development environment as default
ENV NODE_ENV development

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]
