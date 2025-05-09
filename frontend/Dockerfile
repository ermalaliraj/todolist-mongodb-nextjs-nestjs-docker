FROM node:20

WORKDIR /app

# keep package.json in a different layer for avoiding install dependecies if no need
COPY package*.json ./ 
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000

#CMD ["npm", "start"]
CMD ["tail", "-f", "/dev/null"] # Keeps the container running for manual access via: "docker exec -it frontend bash"
