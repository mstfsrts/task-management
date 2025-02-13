# 1) Let's get a small image with a node version
FROM node:20-alpine

# 2) Let's specify the working directory
WORKDIR /app

# 3) Let's copy the package files and install the dependencies
COPY package*.json ./
RUN npm install

# 4) Copy the remaining files
COPY . .

# 5) Let's do production build (vite build)
RUN npm run build

# 6) Let's open port 5000
EXPOSE 5000

# 7) When the container runs, let's start "vite preview"
# If we don't give --host, we can also access from Dokku subdomain, but generally "--host 0.0.0.0" is needed
CMD ["npx", "vite", "preview", "--port", "5000", "--host", "0.0.0.0"]
