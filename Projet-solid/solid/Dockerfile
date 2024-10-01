# Utilise l'image Node.js 20 LTS
FROM node:20

# Définis le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Installe globalement nodemon pour le watch
RUN npm install -g ts-node nodemon

# Expose le port sur lequel ton serveur écoute
EXPOSE 3002
