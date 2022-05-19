FROM node

WORKDIR /appMain

COPY ./package*.json ./
RUN npm install

COPY middleware ./middleware
COPY Models ./Models
COPY public ./public
COPY views ./views
COPY routes ./routes
COPY ./index*.js ./



CMD [ "npm", "run", "dev"]
