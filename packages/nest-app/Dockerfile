FROM node:19-alpine
RUN apk add --update --no-cache openssl1.1-compat

# 创建目录
RUN mkdir -p /app


# 指定工作目录
WORKDIR /app

COPY ./ ./
RUN npm install --force
RUN npm run build
RUN npm run db:pg

# 暴露端口号
EXPOSE 1119

# 程序启动命令
CMD ["npm", "run", "start:prod"]