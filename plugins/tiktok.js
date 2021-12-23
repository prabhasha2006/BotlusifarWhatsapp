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
const capt = " *this is your tik tok video*"

if (Config.WORKTYPE == 'public') {
	
lusifar.addCommand({ pattern: 'ttv ?(.*)', fromMe: false }, async (message, match) => {

    const link = match[1]

    if (!link) return await message.sendMessage(" *Give Vaild Tiktok Link* ")

    await message.sendMessage(' *Downloading your TikTok video* ')

				await axios
					.get(`https://zenzapi.xyz/api/downloader/tiktok?url=${link}&apikey=5c3ceca04a58`)
					.then(async(response) => {
						const {
							nowatermark
						} = response.data.result

						const linkdata = await axios.get(nowatermark, {
							responseType: 'arraybuffer'
						})

						await message.sendMessage(Buffer.from(linkdata.data), MessageType.video, {
								caption: capt,
						})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID TIKTOK LINK*"),
							)
					})
					
}) //pattern close
  
  lusifar.addCommand({ pattern: 'ttv ?(.*)', fromMe: true }, async (message, match) => {

    const link = match[1]

    if (!link) return await message.sendMessage(" *Give Vaild Tiktok Link* ")

    await message.sendMessage(' *Downloading your TikTok video*')

				await axios
					.get(`https://zenzapi.xyz/api/downloader/tiktok?url=${link}&apikey=5c3ceca04a58`)
					.then(async(response) => {
						const {
							nowatermark
						} = response.data.result

						const linkdata = await axios.get(nowatermark, {
							responseType: 'arraybuffer'
						})

						await message.sendMessage(Buffer.from(linkdata.data), MessageType.video, {
								caption: capt,
						})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID TIKTOK LINK*"),
							)
					})
					
}) //pattern close
  
} /* public close*/

else if (Config.WORKTYPE == 'private') {
  
  lusifar.addCommand({ pattern: 'ttv ?(.*)', fromMe: true }, async (message, match) => {

    const link = match[1]

    if (!link) return await message.sendMessage(" *Give Vaild Tiktok Link* ")

    await message.sendMessage(' *Downloading your TikTok video* ')

				await axios
					.get(`https://zenzapi.xyz/api/downloader/tiktok?url=${link}&apikey=5c3ceca04a58`)
					.then(async(response) => {
						const {
							nowatermark
						} = response.data.result

						const linkdata = await axios.get(nowatermark, {
							responseType: 'arraybuffer'
						})

						await message.sendMessage(Buffer.from(linkdata.data), MessageType.video, {
								caption: capt,
						})
							.catch(
								async(err) => await message.sendMessage("⛔️ *INVALID TIKTOK LINK*"),
							)
					})
					
}) //pattern close
  
} /* private close*/
