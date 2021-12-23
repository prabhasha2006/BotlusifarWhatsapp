
FROM kavishkaya/kaviyaahbot:latest

RUN git clone https://github.com/kavishkaya/BotlusifarWhatsapp /root/LUSIFARWABOT
WORKDIR /root/LUSIFARWABOT/
RUN git clone https://github.com/kavishkaya/uploads
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit



CMD ["node", "bot.js"]
