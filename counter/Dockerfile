FROM node

WORKDIR /appCounter

COPY ./package*.json ./
RUN npm install


COPY ./index*.js ./
COPY count ./count


CMD [ "npm", "run", "dev"]
