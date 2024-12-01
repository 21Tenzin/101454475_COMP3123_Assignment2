# Use Node.js as base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
