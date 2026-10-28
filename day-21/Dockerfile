# Base Image:
FROM node:24.20.0-alpine3.24

WORKDIR /home/node-app/

# //it copies all starts with package* letters (package.json file and package-lock.json) and . store PWD in Docker Image
COPY package*.json .

RUN npm install

COPY index.js .
COPY Dockerfile .
COPY README.md .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]