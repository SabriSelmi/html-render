FROM apify/actor-node-puppeteer-chrome:16

USER root

WORKDIR /app

RUN apt upgrade

RUN wget http://ftp.debian.org/debian/pool/main/libx/libxtst/libxtst6_1.2.3-1_amd64.deb

RUN dpkg -i libxtst6_1.2.3-1_amd64.deb

RUN npm install -g nodemon 

## will install dependencies as local packages
RUN npm install -g install-local

COPY package*.json ./

RUN npm install && npm cache clean --force 

RUN rm -rf /tmp/* \ && rm -rf /root/.cache \ && rm -rf /root/.config/chromium && rm -rf /root/.config/chrome

COPY . . 

EXPOSE 3000

ENTRYPOINT [ "node" ,"." ]

