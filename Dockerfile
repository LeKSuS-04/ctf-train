FROM node:18.9.0

WORKDIR /app
COPY . .

RUN npm ci
RUN npm audit fix
RUN npx prisma generate

ENV ORIGIN=http://localhost:3000
RUN npm run build
RUN npx prisma migrate dev

ENTRYPOINT [ "node", "build/index.js" ]
