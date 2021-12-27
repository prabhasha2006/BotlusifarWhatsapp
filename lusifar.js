/* Copyright (C) 2021 KAVIYAAH - Alexa Team  ,  Lusifar whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 8.0.0 avalable)
*/
const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });


function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
 OB_NAME: process.env.L_BOT_NAME === undefined ? 'kavishka' : process.env.L_BOT_NAME,
 OA_NAME: process.env.L_DEP_NAME === undefined ? 'kavishka' : process.env.L_DEP_NAME,
 REMOVE2: process.env.THERI_KICK_PM === undefined ? 'false' : process.env.THERI_KICK_PM,
 PLKAFN: process.env.THERI_LIST_PM === undefined ? false : process.env.THERI_LIST_PM,
 OA_REPLY: process.env.L_DEP_REPLY === undefined ? 'you typed kavishka , he is my creator' : process.env.L_DEP_REPLY,
 PHONE: process.env.NUMBER === undefined ? '+94769370897' : process.env.NUMBER,   
    

};
