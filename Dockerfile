FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN npm ci && npm run build
CMD ['npm', 'start']