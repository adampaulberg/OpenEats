FROM node:8.9.4-alpine

# Create app directory
RUN mkdir /code
WORKDIR /code

# Install app dependencies
ADD . /code/

# Run Yarn to install all dependencies
RUN yarn install --pure-lockfile
