# Use a Node.js base image for building the React app
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# Use an Nginx image to serve the build files
FROM nginx:alpine

# Copy the build files to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports 8083 for HTTP and 443 for HTTPS
EXPOSE 8083
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
