# DEV BUILD STEP
FROM node:16.14-alpine3.14 as devBuild
WORKDIR /app

# Log the npm config and env variables
ENV NODE_ENV=production
RUN npm config ls
RUN env

# Install dependencies first so docker caches them
COPY package.json package-lock.json /app/
RUN ls -a
RUN npm install --production=false

# Copy the source code and build
COPY /app/public ./public
COPY /app/src ./src
COPY /app/remix.config.js ./remix.config.js
COPY /app/remix.env.d.ts ./remix.env.d.ts
COPY /app/tsconfig.json ./tsconfig.json

RUN npm run build:prod
RUN ls -a

# PROD BUILD STEP
FROM node:16.14-alpine3.14

# Create an app directory on the container
WORKDIR /app
ENV NODE_ENV=production

# Project copy build, install only prod dependencies
COPY --from=devBuild /app/build ./build
COPY --from=devBuild /app/public ./public
COPY --from=devBuild /app/remix.config.js ./remix.config.js
COPY package.json package-lock.json healthcheck.js ./

RUN ls -a

RUN npm install @remix-run/serve@1.1.3

# Expose the container port to the OS
# docker run takes -p argument to forward this port to network
EXPOSE 3000

# Start the application
CMD npm run start:prod

HEALTHCHECK --interval=30s --timeout=12s --start-period=30s \  
  CMD node /healthcheck.js
