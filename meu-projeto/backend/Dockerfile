# Use a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto dos arquivos da aplicação
COPY . .

# Expõe a porta 3001
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["node", "index.js"]