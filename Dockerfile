FROM node

<<<<<<< HEAD
WORKDIR /appMain
=======
WORKDIR /app
>>>>>>> 066b672389fbf6d9ddec6305c106943836650c52

COPY ./package*.json ./
RUN npm install

COPY middleware ./middleware
COPY Models ./Models
COPY public ./public
COPY views ./views
COPY routes ./routes
COPY ./index*.js ./



CMD [ "npm", "run", "dev"]
