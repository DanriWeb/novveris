# ============================================================================
# Этап 1. Установка зависимостей
# ============================================================================
FROM node:24-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts && \
    npm cache clean --force

# ============================================================================
# Этап 2. Сборка
# ============================================================================
FROM node:24-alpine AS builder
WORKDIR /app

# Копирование зависимостей
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Копирование .env.docker для использования при сборке
COPY .env.docker .env.production

# Переменные окружения
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Сборка
RUN npm run build

# ============================================================================
# Этап 3. Запуск
# ============================================================================
FROM node:24-alpine AS runner
WORKDIR /app

# Переменные окружения
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Создание пользователей
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копирование файлов
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Установка пользователя
USER nextjs

# Порт
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Запуск
CMD ["node", "server.js"]
