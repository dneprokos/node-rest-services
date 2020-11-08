FROM node:12

# App directory creation
WORKDIR /usr/src/app

# Dependency installation
# asterix sybol ("*") was use in order to copy both files: package.json и package-lock.json
COPY package*.json ./

RUN npm install
# Change to command if you want to create Production build
# RUN npm ci --only=production

# copy source code
COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]