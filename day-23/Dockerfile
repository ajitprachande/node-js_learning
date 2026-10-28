# Base Image:
FROM node:24.20.0-alpine3.24 As base


#stage 1: 
FROM base As builder

WORKDIR /home/build/

# //it copies all starts with package* letters (package.json file and package-lock.json) and . store PWD in Docker Image
COPY package*.json .

RUN npm install

COPY index.js .
COPY Dockerfile .
COPY README.md .
#-----------------------------------------------------------------------------
# stage 2:
FROM base AS runner

WORKDIR /home/app/

# copying from builder stage  
COPY --from=builder /home/build ./

# it takes only required dependencies (omits devdepndencies)
RUN npm install --omit=dev

# security purpose
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

USER nodejs

EXPOSE 8000

CMD [ "npm", "run", "dev" ]