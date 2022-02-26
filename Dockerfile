FROM node:14-alpine
WORKDIR '/code'
ENV PORT 3001
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]