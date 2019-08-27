

# Get node 10
FROM node:10

# Create app directory
WORKDIR /project

# Install app dependencies
COPY package*.json ./

# run yarn
RUN yarn

# get the correct .env file
RUN rm -rf .env.local || true
ADD .env .env.local

# Bundle app source
COPY . .

# run development for docker run
EXPOSE 3000
CMD ["yarn", "start"]
