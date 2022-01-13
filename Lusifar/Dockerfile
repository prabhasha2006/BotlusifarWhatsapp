FROM fusuf/whatsasena:latest

RUN git clone $GITHUB_REPO_URL /root/LUSIFARWABOT
WORKDIR /root/LUSIFARWABOT/
RUN git clone https://github.com/kavishkaya/uploads
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit



CMD ["node", "bot.js"]
