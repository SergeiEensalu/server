import {Telegraf} from "telegraf";
import {setAdminCommand} from "./src/handler/setAdmin";
import {hello} from "./src/handler/hello";
import {start} from "./src/handler/start";
import './src/server';

const TOKEN = '6722392005:AAGGm6LYb_R44BSf5JdFQ-OCTprIsoBfgSw'

const bot = new Telegraf(TOKEN)

start(bot);
hello(bot);
setAdminCommand(bot);

bot.launch();

