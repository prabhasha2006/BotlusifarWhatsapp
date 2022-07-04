//
/* Copyright (C) 2021 KAVIYAAH - Alexa Team  ,  Lusifar whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 8.0.0 avalable)
*/

const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const simpleGit = require('simple-git');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./Lusifar/');
const { DataTypes } = require('sequelize');
const { getMessage } = require("./plugins/sql/greetings");
const git = simpleGit();
const axios = require('axios');
const got = require('got');

const Language = require('./language');
const Lang = Language.getString('updater');
//sql
const LUSIFARDB = config.DATABASE.define('LUSIFAR', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');

// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
   });
};
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function LUSIFAR () {
    await config.DATABASE.sync();
    var StrSes_Db = await LUSIFARDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    
    const conn = new WAConnection();
    conn.version = [2,2140,12];
    const Session = new StringSession();

    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    conn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('✅ Login information updated!')
        );

        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await LUSIFARDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Lusifar')}${chalk.blue.bold('bot')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('ℹ️ Connecting to WhatsApp... Please wait.')}`);
    });
    

    conn.on('open', async () => {
        console.log(
            chalk.green.bold('✅ Login successful!')
        );

        console.log(
            chalk.blueBright.italic('⬇️ Installing external plugins...')
        );

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });

        console.log(
            chalk.blueBright.italic('⬇️  Installing plugins...')
        );
        console.log(
            chalk.green.bold('Lusifar 𝚠𝚘𝚛𝚔𝚒𝚗𝚐 ' + config.WORKTYPE + ' 𝚗𝚘𝚠 👻'));

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });


    
            if (config.LANG == 'EN' || config.LANG == 'SI') {
                await git.fetch();
                var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                if (commits.total === 0) {
                   
                    var webimage = await axios.get(`https://telegra.ph/file/2b96f9eaba69490ae689d.jpg`, { responseType: 'arraybuffer' })
                    await conn.sendMessage(conn.user.jid,Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg  , caption: '\n\n\n\n' + Lang.UPDATE +'\n\n\n\n\n\n *⚡powerd by lusifar*' })
                    await conn.sendMessage(conn.user.jid, "Lusifar ɪꜱ ᴀʟʟ ꜱᴇᴛ", MessageType.text);
                    await conn.sendMessage(conn.user.jid, "```Lusifar WORKING " + config.WORKTYPE + "```" , MessageType.text);
                
//======================test to my number
                 /*   await conn.sendMessage(config.LOGSETTINGS, '\n\n\n\n' + Lang.UPDATE +'\n\n\n\n\n\n *⚡powerd by lusifar*', MessageType.text);
                    await conn.sendMessage(config.LOGSETTINGS, "Lusifar ɪꜱ ᴀʟʟ ꜱᴇᴛ", MessageType.text);
                    await conn.sendMessage(config.LOGSETTINGS, "```Lusifar WORKING " + config.WORKTYPE + "```" , MessageType.text);
                   
var unique = conn.user.jid.split('@')[0]

 await conn.sendMessage(config.LOGSETTINGS, 'මාගේ දෙවියනි නුබ නිසා මන් ලෝකේ සිටින හොදම බොට් හදා ගත්ත .මන් හදවතින්ම ඔයාට ආදරෙයි වස්වාමීනී.මෙන්න මගේ නම්බර් එක🤗 👇 \n  wa.me/' + unique  + "\n මගේ නම " +conn.user.name +  " . \n මම දැන් වැඩ කරන්නෙ " + config.WORKTYPE + "විදිහට \n\n ඔයාට ස්තූතියි🤗❤️‍🩹" , MessageType.text);
//============================ebd */
                } else {
                    var newzelme = Lang.NEW_UPDATE;
                    commits['all'].map(
                        (commit) => {
                            newzelme += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                        }
                    );
                  
                    var webimage = await axios.get(`https://telegra.ph/file/2b96f9eaba69490ae689d.jpg`, { responseType: 'arraybuffer' })
                    await conn.sendMessage(conn.user.jid,Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg  , caption: newzelme + '```'+'\n\n *⚡powerd by lusifar*' })

                            await conn.sendMessage(conn.user.jid, "Lusifar ɪꜱ ᴀʟʟ ꜱᴇᴛ", MessageType.text);
                            await conn.sendMessage(conn.user.jid, "``` WORKING " + config.WORKTYPE + "```" , MessageType.text);
//==================================================
                          /*  await conn.sendMessage(config.LOGSETTINGS, newzelme + '```'+'\n\n *⚡powerd by lusifar*', MessageType.text);
                            await conn.sendMessage(config.LOGSETTINGS, "Lusifar ɪꜱ ᴀʟʟ ꜱᴇᴛ", MessageType.text);
                            await conn.sendMessage(config.LOGSETTINGS, "``` WORKING " + config.WORKTYPE + "```" , MessageType.text);
                          */

                    var unique = conn.user.jid.split('@')[0]

                          await conn.sendMessage(config.LOGSETTINGS, 'මාගේ දෙවියනි නුබ නිසා මන් ලෝකේ සිටින හොදම බොට් හදා ගත්ත .මන් හදවතින්ම ඔයාට ආදරෙයි වස්වාමීනී.මෙන්න මගේ නම්බර් එක🤗 👇 \n  wa.me/' + unique  + "\n මගේ නම " +conn.user.name +  " . \n මම දැන් වැඩ කරන්නෙ " + config.WORKTYPE + "විදිහට \n\n ඔයාට ස්තූතියි🤗❤️‍🩹" , MessageType.text);
                   // await conn.sendMessage​(​config​.​LOGSETTINGS​,​ ​'Hey! \nMy number :- wa.me/'​ ​+​ ​unique​  ​+​ ​"\n My name :-  "​ ​+​conn​.​user​.​name + " . \n Work type :- " + config.WORKTYPE +"\n Thank you⚔",MessageType.text);
//===================================================

                        } 
          }

        });
    
    conn.on('chat-update', async m => {
        if (!m.hasNewMessage) return;
        if (!m.messages && !m.count) return;
        let msg = m.messages.all()[0];
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
        

        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            var blogo = await axios.get(config.BYE_GIF, { responseType: 'arraybuffer' })
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(blogo.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message});
            }
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            var gb = await getMessage(msg.key.remoteJid);
            var wlogo = await axios.get(config.WELCOME_GIF, { responseType: 'arraybuffer' })
            if (gb !== false) {

                await conn.sendMessage(msg.key.remoteJid, Buffer.from(wlogo.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message});
            }
            return;
        }   

     if (config.BLOCKCHAT !== false) {     
        var abc = config.BLOCKCHAT.split(',');                            
        if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
 
    events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    
                    else if ((config.MAHN !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.MAHN.includes(',') ? config.MAHN.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.MAHN || config.MAHN.includes(',') ? config.MAHN.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.MAHN)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
    
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                        
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
/*
                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }
*/
                        try {
                            await command.function(whats, match);
                        } catch (error) {
                            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                                await conn.sendMessage(conn.user.jid, '-- HATA RAPORU [LUSIFAR] --' + 
                                    '\n*LUSIFAR bir hata gerçekleşti!*'+
                                    '\n_Bu hata logunda numaranız veya karşı bir tarafın numarası olabilir. Lütfen buna dikkat edin!_' +
                                    '\n_Yardım için Telegram grubumuza yazabilirsiniz._' +
                                    '\n_Bu mesaj sizin numaranıza (kaydedilen mesajlar) gitmiş olmalıdır._\n\n' +
                                    'Gerçekleşen Hata: ' + error + '\n\n'
                                    , MessageType.text);
                            } else {
                                await conn.sendMessage(conn.user.jid, '__Lusifar_☠☠_[error] ' +
                                    '\n\n*👻 ' + error + '*\n'
                                    , MessageType.text);
                             
                             
                             
                                     await conn.sendMessage(config.LOGSETTINGS, '__Lusifar_☠☠_[error] ' +
                                    '\n\n*👻 ' + error + '*\n'
                                    , MessageType.text);
                            }
                        }
                    }
                }
            }
        )
    });
    
    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

LUSIFAR();
