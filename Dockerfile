FROM node:18.9.0

WORKDIR /app
COPY . .

# Install dependencies
RUN npm ci
RUN npm audit fix

# Generate prisma client
RUN npx prisma generate

# Build application
ENV ORIGIN=http://localhost:3000
RUN npm run build

# HACK: initialize
ENTRYPOINT [ "bash", "-c", "npx prisma migrate deploy && node build/index.js" ]
