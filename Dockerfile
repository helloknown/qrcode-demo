# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:latest

# 将自定义的 Nginx 配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将前端项目的静态文件复制到 Nginx 默认目录
COPY dist /usr/share/nginx/html

EXPOSE 5568