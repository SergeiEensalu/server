"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const TOKEN = '6722392005:AAGGm6LYb_R44BSf5JdFQ-OCTprIsoBfgSw';
console.log("aaa");
const bot = new telegraf_1.Telegraf(TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.launch();
