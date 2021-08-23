FROM node:14.17.2
WORKDIR /code
ENV PORT 80
COPY package.json /code/package.json
RUN npm install
COPY . /code
CMD ["npm", "start"]