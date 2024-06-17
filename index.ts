import {Telegraf} from "telegraf";
import {setAdminCommand} from "./src/handler/setAdmin";
import {hello} from "./src/handler/hello";
import {start} from "./src/handler/start";
import './src/server';

const TOKEN = '' // TODO: REPLACE THIS!

const bot = new Telegraf(TOKEN)

start(bot);
hello(bot);
setAdminCommand(bot);

bot.launch();

