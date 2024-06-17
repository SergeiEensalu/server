import {Context, Telegraf} from "telegraf";
import {handleErrorLog, handleSuccessLog} from "../utils";
import {startService} from "../service/start";

export const start = (bot: Telegraf) => {
  bot.start((ctx: Context) => {
    startService(ctx)
      .then((response) => {
        ctx.reply(response.message, response.options)
          .then(handleSuccessLog)
          .catch(handleErrorLog);
      })
      .catch((error: any) => {
        ctx.reply(`Error: ${error.message}`)
          .then(handleSuccessLog)
          .catch(handleErrorLog);
      });
  });
};