# Use Node.js 16 as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the backend source code into the container
COPY . .

# Install dependencies
RUN npm install

# Build the backend
RUN npm run build

# Expose port 3000 for the backend server
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
