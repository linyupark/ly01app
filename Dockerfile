# 部署docker
FROM node:18-alpine
RUN npm config set registry https://registry.npm.taobao.org
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk update && apk add git
RUN mkdir /project
RUN git clone -b 'master' --single-branch --depth 1 git@github.com:linyupark/ly01app.git /project/ly01app
RUN cd /project/ly01app
WORKDIR /project/ly01app
CMD git pull origin master && npm i && npx astro build && npx astro preview
EXPOSE 3000