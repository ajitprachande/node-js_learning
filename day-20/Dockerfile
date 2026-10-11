# base Image
FROM ubuntu

# Update package lists
RUN apt-get update
# Install curl
RUN apt install -y curl

# Download the Node.js 24 setup script
RUN curl -sL https://deb.nodesource.com/setup_24.x -o /tmp/nodesource_setup.sh

# Configure the NodeSource repository
RUN bash /tmp/nodesource_setup.sh

# Install Node.js and npm
RUN apt-get install -y nodejs


# Copying application files
COPY index.js /home/app/server.js
COPY package-lock.json /home/app/package-lock.json
COPY package.json /home/app/package.json
COPY .env /home/app/.env
COPY .gitignore /home/app/.gitignore
COPY README.md /home/app/README.md

# Set the working directory
WORKDIR /home/app/

# Install project dependencies
RUN npm install



