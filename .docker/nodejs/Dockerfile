FROM node:20.17.0
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/
#RUN --mount=type=bind,source=package.json,target=package.json
#    --mount=type=bind,source=package-lock.json,target=package-lock.json \
#    --mount=type=cache,target=/root/.npm \
#    npm ci --include=dev
#COPY package*.json ./usr/src/app
#COPY package-lock.json package-lock.json
#USER node
#COPY . /usr/src/app
#COPY --chown=node:node . /usr/src/app
#RUN npm install
EXPOSE 3000
CMD ["npm","start"]