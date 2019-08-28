

# Get node 10
FROM node:10

# Create app directory
WORKDIR /project

# Install app dependencies
COPY package*.json ./

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

# run yarn
ADD yarn.lock /yarn.lock
RUN yarn

# get the correct .env file
RUN rm -rf .env.local || true
ADD .env .env.local

# Bundle app source
COPY . /project

# run development for docker run
EXPOSE 3000
EXPOSE 35729
CMD ["yarn", "start"]
