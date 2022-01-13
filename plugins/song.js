/*
Copyright (C) 2021 KAVIYAAH - Alexa Team  ,  Lusifar whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 8.0.0 avalable)

const lusifar = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const Language = require('../language');
const Lang = Language.getString('scrapers');
const NO_RESULT = "*🌀can't Find Anything...*"
const NEED_TEXT_SONG = "*need word!.*"
let KSK = config.WORKTYPE == 'public' ? false : true
let SKS = config.WORKTYPE == 'public' ? true : true


    lusifar.addCommand({pattern: 'song ?(.*)', fromMe: SKS, desc: Lang.SONG_DESC}, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_TEXT_SONG,MessageType.text, {quoted: message.data});  
        await message.client.sendMessage(message.jid, config.SONGD, MessageType.text, { quoted: message.data });

        let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data});
        
        let thumbnail = arama[0].thumbnail.replace(' ', '+');
        let title = arama[0].title.replace(' ', '+');
    
        let stream = ytdl(arama[0].videoId, {
            quality: 'highestaudio',
        });
    
        got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
        ffmpeg(stream)
            .audioBitrate(320)
            .save('./' + title + '.mp3')
            .on('end', async () => {
                const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
                writer.setFrame('TIT2', arama[0].title)
                    .setFrame('TPE1', [arama[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(title + '.jpg'),
                        description: arama[0].description
                    });
                writer.addTag();
                const msg = '*🎼Song :- ' + title + '* \n\n' + '📁 Type :- MP3' + '\n\n' + '⚜️ *Download your song below 👇🏻* \n\n\n  _*powered by lusifar*_' 
                var iavatar = await axios.get(thumbnail,{responseType: 'arraybuffer'});
                 
                 await message.client.sendMessage(message.jid, config.SONGU,MessageType.text, {quoted: message.data});


                await message.sendMessage(Buffer.from(iavatar.data), MessageType.image, { mimetype: Mimetype.jpg, caption: msg, quoted: message.data}); 
                await message.client.sendMessage(message.jid, Buffer.from(writer.arrayBuffer), MessageType.audio, { mimetype: 'audio/mpeg', quoted: message.data })
                await message.client.sendMessage(message.jid, Buffer.from(writer.arrayBuffer), MessageType.document, { filename: title + '.mp3', mimetype: 'audio/mpeg', ptt: false, quoted: message.data});


            });
    }));



lusifar.addCommand({ pattern: 'song ?(.*)', fromMe: KSK, dontAddCommandList:true }, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid, NEED_TEXT_SONG, MessageType.text, { quoted: message.data });
    await message.client.sendMessage(message.jid, config.SONGD, MessageType.text, { quoted: message.data });

    let arama = await yts(match[1]);
    arama = arama.all;
    if (arama.length < 1) return await message.client.sendMessage(message.jid, NO_RESULT, MessageType.text, { quoted: message.data });

    let thumbnail = arama[0].thumbnail.replace(' ', '+');
    let title = arama[0].title.replace(' ', '+');

    let stream = ytdl(arama[0].videoId, {
        quality: 'highestaudio',
    });

    got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
    ffmpeg(stream)
        .audioBitrate(320)
        .save('./' + title + '.mp3')
        .on('end', async () => {
            const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
            writer.setFrame('TIT2', arama[0].title)
                .setFrame('TPE1', [arama[0].author.name])
                .setFrame('APIC', {
                    type: 3,
                    data: fs.readFileSync(title + '.jpg'),
                    description: arama[0].description
                });
            writer.addTag();
            const msg = '*🎼Song :- ' + title + '* \n\n' + '📁 Type :- MP3' + '\n\n' + '⚜️ *Download your song below 👇🏻* \n\n\n  _*powered by lusifar*_'
            var iavatar = await axios.get(thumbnail, { responseType: 'arraybuffer' });

            await message.client.sendMessage(message.jid, config.SONGU, MessageType.text, { quoted: message.data });


            await message.sendMessage(Buffer.from(iavatar.data), MessageType.image, { mimetype: Mimetype.jpg, caption: msg, quoted: message.data });
            await message.client.sendMessage(message.jid, Buffer.from(writer.arrayBuffer), MessageType.audio, { mimetype: 'audio/mpeg', quoted: message.data })
            await message.client.sendMessage(message.jid, Buffer.from(writer.arrayBuffer), MessageType.document, { filename: title + '.mp3', mimetype: 'audio/mpeg', ptt: false, quoted: message.data });


        });
}));






*/















const lusifar = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const { errorMessage, infoMessage } = require('../helpers');
const YTV_DESC = "Youtube song Downloader "
const YT_NEED = "*need word!.*"
const NO_RESULT = "*🌀can't Find Anything...*"
const config = require('../config');
let KSK = config.WORKTYPE == 'public' ? false : true
//උස්සන්නද ආවෙ බේසිකයෝ.බොහොම අමාරුවෙන් හැදුවෙ.උස්සන එකා අවජාතකයෙක් කියල හිතාගන්න පුලුවන් පොන්න හැත්ත.හුකන පොන්නයෝ
//normal mode
//with info
    lusifar.addCommand({ pattern: 'song ?(.*)', fromMe: KSK, deleteCommand: false, dontAddCommandList:true,  deleteCommand: false}, async (message, match) => {
        const linkk = match[1]
        if (!linkk) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        await message.client.sendMessage(message.jid,config.SONGD,MessageType.text, {quoted: message.data});
        await axios
          .get(`https://api-alphabot.herokuapp.com/api/downloader/youtube/playmp3?query=${linkk}&apikey=Alphabot`)
          .then(async (response) => {
            const {
              mp3,title,
            } = response.data.results
            const videoBuffer = await axios.get(mp3, {responseType: 'arraybuffer'})
            const cptt = title
            await message.client.sendMessage(message.jid,config.SONGU,MessageType.text, {quoted: message.data});
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.audio, { mimetype: 'audio/mpeg', quoted: message.data})
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {filename: cptt + '.mp3',mimetype: 'audio/mpeg', quoted: message.data})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
    
        lusifar.addCommand({ pattern: 'song ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList:true,  deleteCommand: false}, async (message, match) => {
        const linkk = match[1]
        if (!linkk) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        await message.client.sendMessage(message.jid,config.SONGD,MessageType.text, {quoted: message.data});
        await axios
          .get(`https://api-alphabot.herokuapp.com/api/downloader/youtube/playmp3?query=${linkk}&apikey=Alphabot`)
          .then(async (response) => {
            const {
              mp3,title,
            } = response.data.results
            const videoBuffer = await axios.get(mp3, {responseType: 'arraybuffer'})
            const cptt = title
            await message.client.sendMessage(message.jid,config.SONGU,MessageType.text, {quoted: message.data});
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.audio, {mimetype: 'audio/mpeg', quoted: message.data})
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {filename: cptt + '.mp3',mimetype: 'audio/mpeg', quoted: message.data})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
