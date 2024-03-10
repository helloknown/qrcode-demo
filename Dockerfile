# 使用 Node 作为基础镜像
FROM node:20.10.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json .
COPY package-lock.json .

# 安装依赖
RUN npm install

# 复制整个项目到工作目录
COPY . .

# 构建项目
RUN npm run build

# 暴露端口
# EXPOSE 3000

# 启动应用
CMD ["npm", "run", "serve"]