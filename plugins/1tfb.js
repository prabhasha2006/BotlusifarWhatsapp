/* Copyright (C) 2021 KAVIYAAH - Alexa Team  ,  Lusifar whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 8.0.0 avalable)
*/

/* Copyright (C) 2021 lusifar */
// අමාරුවෙන් යකො හැදුවෙ. උස්සන්න එපා තිරිසනෝ 😒
const lusifar = require('../events');
const {MessageType,mimetype,Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const capt = "　🧛‍♂️ *LUSIFAR FB DOWNLOADER* 💜\n"
const DOWNMSG = "🧛‍♂️ *DOWNLOADING FB VIDEO...* 🤍"
const UPMSG = "🧛‍♂️ _*U P L O A D I N G*_  💕"
let KSKK = Config.WORKTYPE == 'public' ? true : true
let KSP = Config.WORKTYPE == 'public' ? true : false

                           
// -----------------------------------------------------------------------
//                               MAIN COMMAND
// -----------------------------------------------------------------------
lusifar.addCommand({ pattern: 'fb ?(.*)', fromMe: KSP , desc: 'facebook video download'}, async (message, match) => {
// අමාරුවෙන් යකො හැදුවෙ. උස්සන්න එපා තිරිසනෝ 😒
    const link = match[1]
    if (!link) return await message.sendMessage("🧛‍♂️ *Give Vaild FB Link* ")
    await message.sendMessage(DOWNMSG)
	
	var url = `https://api.lolhuman.xyz/api/facebook?apikey=https://www.amdaniwasa.com&url=${link}`
				// 
				await axios 
					.get(`${url}`)
					.then(async(response) => {
						const {
							result
						} = response.data
						const kavifb = await axios.get(result, {responseType: 'arraybuffer'})
						await new Promise(r => setTimeout(r, 2000));
						await message.client.sendMessage(message.jid,UPMSG,MessageType.text);
						await message.sendMessage(Buffer.from(kavifb.data), MessageType.video, {caption: capt,})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID FB LINK*"),
							)
					})
					
}) //pattern close
lusifar.addCommand({ pattern: 'fb ?(.*)', fromMe: KSKK , dontAddCommandList: true}, async (message, match) => {
// අමාරුවෙන් යකො හැදුවෙ. උස්සන්න එපා තිරිසනෝ 😒
    const link = match[1]
    if (!link) return await message.sendMessage("🧛‍♂️ *Give Vaild FB Link* ")
    await message.sendMessage(DOWNMSG)
	
	var url = `https://api.lolhuman.xyz/api/facebook?apikey=https://www.amdaniwasa.com&url=${link}`
				// 
				await axios 
					.get(`${url}`)
					.then(async(response) => {
						const {
							result
						} = response.data
						const kavifb = await axios.get(result, {responseType: 'arraybuffer'})
						await new Promise(r => setTimeout(r, 2000));
						await message.client.sendMessage(message.jid,UPMSG,MessageType.text);
						await message.sendMessage(Buffer.from(kavifb.data), MessageType.video, {caption: capt,})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID FB LINK*"),
							)
					})
					
}) //pattern close
 
// -----------------------------------------------------------------------
//                               NOT WORKING COMMAND
// -----------------------------------------------------------------------
lusifar.addCommand({ pattern: 'xxfbsd ?(.*)', fromMe:KSKK , dontAddCommandList: true}, async (message, match) => {
// අමාරුවෙන් යකො හැදුවෙ. උස්සන්න එපා තිරිසනෝ 😒
    const link = match[1]
    if (!link) return await message.sendMessage("🧛‍♂️ *Give Vaild FB Link* ")
    await message.sendMessage('⛔️ _*ERROR 404*_')
	
	var url = `https://api.lolhuman.xyz/api/facebook?apikey=https://www.amdaniwasa.com&url=${link}`
				// 
				await axios 
					.get(`${url}`)
					.then(async(response) => {
						const {
							result
						} = response.data
						const kavifb = await axios.get(result, {responseType: 'arraybuffer'})
						await new Promise(r => setTimeout(r, 2000));
						await message.client.sendMessage(message.jid,UPMSG,MessageType.text);
						await message.sendMessage(Buffer.from(kavifb.data), MessageType.video, {caption: capt,})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID FB LINK*"),
							)
					})
					
})
