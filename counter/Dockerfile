FROM node

<<<<<<< HEAD
WORKDIR /appCounter
=======
WORKDIR /app
>>>>>>> 066b672389fbf6d9ddec6305c106943836650c52

COPY ./package*.json ./
RUN npm install


COPY ./index*.js ./
COPY count ./count


CMD [ "npm", "run", "dev"]
