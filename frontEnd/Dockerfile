# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

ENV PORT=5173
EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5173/ || exit 1

CMD ["serve", "-s", "dist", "-l", "3000"]
