FROM node:latest

RUN apt-get update && apt-get -y upgrade
RUN apt-get install ffmpeg -y
RUN git clone https://github.com/KiZakiXD/Nyoba-Plugins-Doang-Bang /root/HyNO
WORKDIR /root/HyNO/
RUN yarn install --network-concurrency 1
RUN npm i -g supervisor
RUN npm i -g concurrently

CMD ["node", "bot.js"] 



#-------------Dockerfile KiZakiXD-------------#
