FROM node:23.3-alpine

# Set the working directory
WORKDIR /app
COPY . /app/

ENV MONGO_STR=mongodb://db:27017/todos

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "node src/index.js"]