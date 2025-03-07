# Use Node.js 16 as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the frontend source code into the container
COPY . .

# Install dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Expose port 8080 for the frontend server
EXPOSE 8080

# Start the frontend server
CMD ["npm", "run", "serve"]
