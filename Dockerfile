FROM node:18.9.0

WORKDIR /app
COPY . .

RUN npm ci
RUN npm audit fix

RUN npx prisma generate
RUN npx prisma migrate deploy

ENV ORIGIN=http://localhost:3000
RUN npm run build

ENTRYPOINT [ "node", "build/index.js" ]
