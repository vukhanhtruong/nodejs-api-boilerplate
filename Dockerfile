FROM node:9-alpine

MAINTAINER Truong Vu <vukhanhtruong@gmail.com>

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

ADD processes.json \
    package-scripts.js \
    package.json \
    yarn.lock \
    .babelrc \
    .eslintrc \
    .eslintignore \
    .prettierrc \
    .env \
    apidoc.json \
    backpack.config.js \
    nacl.json /app/
COPY ./src /app/src

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile
RUN yarn global add pm2

# RUN yarn install
RUN yarn build

# expose port 3000
EXPOSE 3000

# cmd to start service
CMD ["pm2", "start", "processes.json", "--no-daemon"]
