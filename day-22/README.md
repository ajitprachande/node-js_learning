
- Today i code both normal docker image and mulistage build: practical learning:

## normal docker image `node:24`


```bash 
    FROM node:24

    WORKDIR /home/app/

    COPY package*.json .

    RUN npm install

    COPY app.js .
    COPY Dockerfile .

    EXPOSE 8000

    CMD [ "npm", "run", "dev" ]

```

```bash
     IMAGE                         ID             DISK USAGE   CONTENT SIZE   EXTRA
    my-normal-image:latest        9ca1c1ec6c03       1.66GB          415MB

```

## issues this normal docker image:
- it uses full node image = Large size [1.66gb].
- it install all dependencies 
- no seperation between build and runtime
- slower build and  heavier image
 
## multistage distroless Image

```bash
    FROM node:24.20.0-alpine AS base

# ------------------------------------------------------------
# stage 1 
FROM base AS builder  

WORKDIR /home/build

COPY package*.json ./

RUN npm install

COPY app.js ./
#-------------------------------------------------------------

# stage 2: Runner

FROM base AS runner

WORKDIR /home/app/ 

COPY --from=builder /home/build ./

RUN npm install --omit=dev

EXPOSE 8000

CMD [ "npm", "start" ]


```


```bash
    IMAGE                        ID             DISK USAGE   CONTENT SIZE   EXTRA
    my-multistage-image:latest   211b4d23b8ad        248MB         60.2MB
```

## Distroless conainer image
- "Distroless" images contain only your application and its runtime dependencies. They do not contain package
managers, shells or any other programs you would expect to find in a standard Linux distribution.