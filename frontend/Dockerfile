FROM node
WORKDIR /react-news-app
COPY package.json /react-news-app/
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start