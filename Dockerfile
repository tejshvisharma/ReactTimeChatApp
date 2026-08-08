# use the official Bun image
FROM oven/bun:latest as builder

# set the working directory
WORKDIR /app

# build the frontend
WORKDIR /app/web

# copy the package.json and package-lock.json files
COPY web/package.json web/bun.lock* ./

# install dependencies
RUN bun install --frozen-lockfile

# copy the source code
COPY web/ ./

# build the application
RUN bun run build

# build the backend
WORKDIR /app/backend

# copy the package.json and bun.lock files
COPY backend/package.json backend/bun.lock* ./

# install dependencies
RUN bun install --frozen-lockfile

# copy the source code
COPY backend/ ./

# expose the port
EXPOSE 3000

# set the non-sensitive default environment variables
ENV port=3000
ENV NODE_ENV=production

# start the application
CMD ["bun", "src/index.ts"]
