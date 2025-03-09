# Use the node:14 image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Run yarn install to install dependencies
RUN yarn install

# Copy the rest of the application files to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Set the default command to yarn dev
CMD ["yarn", "dev"]
