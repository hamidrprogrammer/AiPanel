# Use an official Node runtime as a parent image
FROM node:16 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Use Nginx to serve the application
FROM nginx:alpine

# Copy the build files to the Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates
COPY certs/your_certificate.crt /etc/ssl/certs/
COPY certs/your_private_key.key /etc/ssl/private/

# Expose port 3000
EXPOSE 3000
