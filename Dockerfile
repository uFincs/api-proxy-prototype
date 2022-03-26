FROM node:15

RUN mkdir -p /proxy && chown node /proxy
USER node
WORKDIR /proxy

COPY --chown=node:node package.json package-lock.json ./
RUN npm install

COPY --chown=node:node . .
RUN npm run compile

EXPOSE 5001

CMD ["npm", "run", "start"]
