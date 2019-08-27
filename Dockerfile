

# Get node 10
FROM node:10

# Create app directory
WORKDIR /project

# Install app dependencies
COPY package*.json ./

# run yarn
RUN yarn

# Bundle app source
COPY . .

# get the correct .env file
RUN rm .env.local
ADD .env .env.local

# deploy app to github
RUN yarn deploy

# run development for docker run
EXPOSE 3000
CMD ["yarn", "start"]
