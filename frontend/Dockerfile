# FROM node:18-alpine
FROM node:24-alpine

WORKDIR /app

COPY package.json .

# RUN yarn
# or
RUN npm install 

COPY . .

# EXPOSE 3000
# EXPOSE 5173

# CMD [ "yarn", "start" ]
# or
# CMD [ "npm", "start" ]
CMD [ "npm", "run", "dev" ]