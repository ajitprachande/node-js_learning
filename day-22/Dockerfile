FROM node:24.20.0-alpine AS base
# --------------------------------------------------------------------------------------------------------------------------------
# stage 1 
FROM base AS builder  

WORKDIR /home/build

COPY package*.json ./

RUN npm install

COPY app.js ./  
# --------------------------------------------------------------------------------------------------------------------------------

# stage 2: Runner

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

ENV port=8000
EXPOSE 8000

CMD [ "npm", "start" ]