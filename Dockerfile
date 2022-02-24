FROM node:14.17.2
WORKDIR '/code'
ENV PORT 3001
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]