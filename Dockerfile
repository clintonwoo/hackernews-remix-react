# base node image
FROM node:16.14-alpine3.14 as base

# Install all node_modules, including dev dependencies
FROM base as deps
RUN mkdir /app
WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps
RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD public ./public
ADD src ./src
ADD package.json package-lock.json remix.config.js remix.env.d.ts tsconfig.json ./
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
ENV NODE_ENV=production
ENV PORT=8080
RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY package.json package-lock.json healthcheck.js ./

# Expose the container port to the OS
EXPOSE 8080

CMD ["npm", "run", "start"]
