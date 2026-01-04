# Use a lightweight Node image
FROM node:latest

# Set the working directory inside the container
WORKDIR /.

# Copy package files first (for build caching)
COPY package*.json ./

# Install dependencies (use ci if you have package-lock.json)
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Start the app
CMD ["npm", "run" ,"run"]
