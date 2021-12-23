/* Copyright (C) 2021 KAVIYAAH - Alexa Team  ,  Lusifar whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 8.0.0 avalable)
*/

const lusifar = require('../events');
const {MessageType,mimetype,Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const Language = require('../language');
const Lang = Language.getString('scrapers');
const capt = " *Lusifar Tiktok Downloader* \n"
let Kaviyaah = Config.WORKTYPE == 'public' ? false : true
let btmy = Config.WORKTYPE == 'public' ? true : false

	
lusifar.addCommand({ pattern: 'tiktok ?(.*)', fromMe: Kaviyaah, desc: "downloading tik tok videos"}, async (message, match) => {

    const link = match[1]

    if (!link) return await message.sendMessage(" *Give Vaild Tiktok Link* ")

    await message.sendMessage('👻 *Tiktok Video Downloading*  \n')

				await axios
					.get(`https://zenzapi.xyz/api/downloader/tiktok2?url=${link}&apikey=f55909b302`)
					.then(async(response) => {
						const {
							url,author
						} = response.data.result

						const linkdata = await axios.get(url, {
							responseType: 'arraybuffer'
						})
                        await message.sendMessage('👻 *Tiktok Video Uploading*  \n'+Lang.UPLOADING_VIDEO)
						await message.sendMessage(Buffer.from(linkdata.data), MessageType.video,{quoted: message.data} ,  {
								caption: '*CHANNEL AUTHOR* '+ author + '\n\n' + capt
						})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID TIKTOK LINK*"),
							)
					})
					
}) //pattern close
  
lusifar.addCommand({ pattern: 'tiktok ?(.*)', fromMe: btmy, desc: "downloading tik tok videos"}, async (message, match) => {

    const link = match[1]

    if (!link) return await message.sendMessage(" *Give Vaild Tiktok Link* ")

    await message.sendMessage('👻 *Tiktok Video Downloading*  \n')

				await axios
					.get(`https://zenzapi.xyz/api/downloader/tiktok2?url=${link}&apikey=f55909b302`)
					.then(async(response) => {
						const {
							url,author
						} = response.data.result

						const linkdata = await axios.get(url, {
							responseType: 'arraybuffer'
						})
                        await message.sendMessage('👻 *Tiktok Video Uploading*  \n')
						await message.sendMessage(Buffer.from(linkdata.data), MessageType.video, {quoted: message.data} , {
								caption: '*CHANNEL AUTHOR:* ' + author + '\n\n' + capt
						})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID TIKTOK LINK*"),
							)
					})
					
}) 

