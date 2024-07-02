FROM node:latest

# Instala netcat para usar o comando nc
RUN apt-get update && apt-get install -y netcat-traditional

WORKDIR /src/app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-it.sh ./

EXPOSE 3000

CMD ["./wait-for-it.sh", "db", "3306", "--", "npm", "start"]
